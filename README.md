# ✈️ AI Travel Planner

> An AI-powered multi-user travel planning platform that generates personalized itineraries, realistic budget estimations, hotel suggestions, and weather-aware travel recommendations.

---

# 🚀 Project Overview

**AI Travel Planner** is a full-stack AI-powered web application that helps users create and manage intelligent travel plans.

The platform allows users to:

* 🔐 Register and log in securely
* 🧳 Create and manage trips
* 🤖 Generate AI-powered itineraries
* 📅 View day-by-day travel plans
* ✏️ Edit and regenerate itinerary days
* 🏨 Get hotel recommendations
* 💰 View realistic budget estimations
* 🌦 Receive weather-aware recommendations
* 📊 Access a personalized dashboard

The application dynamically adapts recommendations based on weather conditions and user preferences.

---

# 🌟 Key Features

## 🔐 Authentication & Authorization

The application implements secure JWT-based authentication.

### Features

* User registration and login
* JWT token authentication
* Protected frontend routes
* User-specific trip isolation
* Persistent login sessions
* Secure API access

---

## 🤖 AI Itinerary Generation

The AI system generates:

* 📅 Day-by-day travel itineraries
* 🎯 Personalized activity suggestions
* 🏨 Hotel recommendations
* 🚕 Transportation tips
* 💸 Budget-aware plans

### AI Input Parameters

The itinerary generation is customized based on:

* Destination
* Trip duration
* Budget type
* User interests
* Weather conditions

---

## ✏️ Editable Itinerary

Users can dynamically modify generated itineraries.

### Supported Actions

* ➕ Add new activities
* ❌ Remove activities
* 🔄 Regenerate a specific day
* 🛠 Modify itinerary plans

### Example

```text
Regenerate Day 3 with more outdoor activities
```

---

# 🌦 Weather-Aware Itinerary (Creative Feature)

## 📌 Overview

This project includes a custom **Weather-Aware Itinerary** feature.

The system fetches real-time weather forecasts using **WeatherAPI** and dynamically modifies the AI-generated itinerary.

---

## 🌤 Example Behavior

### ☀ Sunny Weather

* Outdoor sightseeing
* Parks and walking tours
* Beach activities
* Open-air attractions

### 🌧 Rainy Weather

* Museums
* Cafes
* Aquariums
* Shopping malls

### ❄ Snowy Weather

* Indoor warm activities
* Safe travel suggestions
* Winter-friendly experiences

---

## 💡 Why I Built This Feature

Most travel planning applications generate static itineraries that fail to adapt to real-world environmental conditions.

Weather changes can significantly affect travel experiences.

This feature improves:

* ✅ User experience
* ✅ Practical trip planning
* ✅ Recommendation reliability
* ✅ Real-world usability

---

## 🧠 Engineering Judgment

I designed the application so weather forecasts dynamically modify AI prompts before itinerary generation.

This architecture enables:

* Scalable AI customization
* Context-aware recommendations
* Adaptive travel planning
* Better real-world decision making

---

# 💰 Dynamic Budget Estimation

## 📌 Problem

Pure AI-generated budgets were often unrealistic and inconsistent.

---

## ✅ Solution

I implemented a **Hybrid Budget Estimation System**.

### How It Works

* AI estimates local daily costs
* Backend performs deterministic calculations
* Final totals depend on:

  * Destination
  * Trip duration
  * Budget type

---

## 🎯 Benefits

This approach provides:

* More realistic totals
* Stable calculations
* City-specific pricing
* Better engineering reliability

---

# 🛠 Tech Stack

## 🎨 Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* Lucide React

### Why React?

React was chosen because it provides:

* Reusable components
* Scalable architecture
* Fast UI rendering
* Easier state management

---

## ⚙ Backend

* Node.js
* Express.js

### Why Express?

Express offers:

* Lightweight server architecture
* Flexible routing
* Middleware support
* Easy REST API development

---

## 🗄 Database

* MongoDB
* Mongoose

### Why MongoDB?

MongoDB is suitable because:

* Flexible schema design
* Easy JSON-like storage
* Scalable NoSQL architecture
* Ideal for dynamic itinerary data

---

## 🤖 AI Integration

* Gemini API / LLM Integration

### AI Responsibilities

* Itinerary generation
* Hotel recommendations
* Travel suggestions
* Weather-aware planning
* Budget-aware recommendations

---

## 🌐 External APIs

### WeatherAPI

Used for:

* Real-time weather forecasts
* Weather-aware itinerary adjustments

---

# 🏗 High-Level Architecture

```text
Frontend (React)
        ↓
Backend API (Node.js + Express)
        ↓
MongoDB Database
        ↓
AI Model + Weather API
```

---

# 🔐 Authentication & Authorization Approach

The application uses **JWT-based authentication**.

## 🔄 Authentication Flow

1. User registers
2. User logs in
3. Backend generates JWT token
4. Token stored in localStorage
5. Protected routes validate authentication
6. Unauthorized users are redirected

---

## 🛡 Security Features

* JWT token validation
* Protected API routes
* User-specific data isolation
* Session expiration handling
* Route guards using React Router

---

# 🤖 AI Agent Design

The AI system receives structured prompts containing:

* Destination
* Trip duration
* Budget level
* Weather conditions
* User preferences

---

## 📤 AI Output

The AI returns:

* Structured itinerary
* Hotel suggestions
* Activity recommendations
* Transportation guidance

---

## ⚙ Backend Processing

The backend further processes AI responses for:

* Budget calculations
* Weather-aware adjustments
* Structured data storage

---

# 📂 Folder Structure

```text
frontend/
  src/
    components/
    pages/
    contexts/
    routes/
    services/

backend/
  controllers/
  models/
  routes/
  middleware/
  utils/
  config/
```

---

# ⚙️ Local Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone <repository-url>
```

---

## 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 3️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
WEATHER_API_KEY=your_weather_api_key
```

---

## Frontend (.env)

```env
VITE_API_URL=your_backend_url/api
```

---

# 🌐 Deployment

## Frontend Deployment

* Vercel

## Backend Deployment

* Render

---

# 📸 Application Flow

## 👤 User Journey

1. Register account
2. Login securely
3. Create trip
4. Enter destination and trip details
5. AI generates itinerary
6. Weather forecast fetched
7. Budget estimated dynamically
8. User edits or regenerates itinerary
9. Trips stored in dashboard

---

# 🎯 Key Design Decisions

## 1️⃣ Hybrid Budget Estimation

Instead of relying fully on AI-generated totals, I combined:

* AI-based local estimates
* Backend mathematical calculations

### Benefits

* Better consistency
* More realistic pricing
* Improved reliability

---

## 2️⃣ Weather-Aware Planning

I integrated weather forecasts into AI prompts to improve real-world practicality.

### Benefits

* Adaptive itineraries
* Contextual recommendations
* Smarter travel planning

---

## 3️⃣ Route Protection

Protected routes ensure:

* Secure access
* User-specific isolation
* Better authentication flow

---

# ⚠️ Known Limitations

* Weather forecasts are limited by free API restrictions
* AI responses may vary slightly between requests
* Budget estimation is approximate and not exact market pricing
* Some destinations may have limited weather coverage

---

# 🔮 Future Improvements

Possible future enhancements include:

* ✈️ Live flight price integration
* 🗺 Google Maps integration
* 🏨 Real hotel booking APIs
* 🌍 Multi-language support
* 📄 PDF itinerary export
* 🤖 AI travel assistant chatbot
* 👥 Collaborative group trip planning
* 📱 Offline itinerary mode

---

# 📹 Walkthrough Video

Add your walkthrough video link here:

```text
Video Link: <your-video-link>
```

---

# 🌍 Live Deployment Links

## Frontend

```text
<your-vercel-url>
```

## Backend

```text
<your-render-url>
```

---

# 👨‍💻 Author

**Shivam Sen**

---

# 📌 Final Note

This project focuses not only on functionality, but also on:

* System design thinking
* Engineering judgment
* Responsible AI usage
* Practical problem solving
* Scalable architecture

The goal was to build an intelligent and adaptive travel planning experience rather than a static itinerary generator.

This project focuses not only on functionality, but also on:

* system design thinking
* engineering judgment
* responsible AI usage
* practical problem solving
* scalable architecture

The goal was to create an intelligent and adaptive travel planning experience rather than a static itinerary generator.
