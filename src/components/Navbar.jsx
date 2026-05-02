import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h2>AI Travel Planner</h2>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate("/create-trip")}>Create Trip</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;