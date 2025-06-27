"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import "./App.css"

// Pages
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Profile from "./components/Profile"
import Charts from "./components/Charts"
import Events from "./components/Events"
import Chatbot from "./components/Chatbot"
import Contact from "./components/Contact"
import About from "./components/About"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedInStatus = localStorage.getItem("isLoggedIn")
    if (loggedInStatus === "true") {
      setIsLoggedIn(true)
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("darkMode")
    if (savedTheme === "true") {
      setDarkMode(true)
      document.body.classList.add("dark-mode")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle("dark-mode")
    localStorage.setItem("darkMode", !darkMode)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "true")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.setItem("isLoggedIn", "false")
  }

  return (
    <Router>
      <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
        {isLoggedIn && <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />}
        <div className="main-content">
          {isLoggedIn && <Sidebar />}
          <div className="page-content">
            <Routes>
              <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
              <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
              <Route path="/charts" element={isLoggedIn ? <Charts /> : <Navigate to="/login" />} />
              <Route path="/events" element={isLoggedIn ? <Events /> : <Navigate to="/login" />} />
              <Route path="/chatbot" element={isLoggedIn ? <Chatbot /> : <Navigate to="/login" />} />
              <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/login" />} />
              <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
