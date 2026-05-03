import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lastActivity");
    setUser(null);
    window.location.href = "/";
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("lastActivity", Date.now().toString());
    const decoded = jwtDecode(token);
    setUser({ token, ...decoded });
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      const lastActivity = localStorage.getItem("lastActivity");
      const INACTIVITY_LIMIT = 10 * 60 * 1000;

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const isTokenExpired = decoded.exp * 1000 < Date.now();
          const isInactive = lastActivity && (Date.now() - parseInt(lastActivity) > INACTIVITY_LIMIT);

          if (isTokenExpired || isInactive) {
            logout();
          } else {
            setUser({ token, ...decoded });
            localStorage.setItem("lastActivity", Date.now().toString());
          }
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    checkToken();

    const resetTimer = () => {
      if (localStorage.getItem("token")) {
        localStorage.setItem("lastActivity", Date.now().toString());
      }
    };

    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      const lastActivity = localStorage.getItem("lastActivity");
      if (token && lastActivity) {
        if (Date.now() - parseInt(lastActivity) > 10 * 60 * 1000) {
          logout();
        }
      }
    }, 30000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearInterval(interval);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}