"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaSun, FaMoon, FaBell, FaUser, FaSignOutAlt } from "react-icons/fa"

const Header = ({ darkMode, toggleDarkMode, handleLogout }) => {
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    // Simulate fetching notifications
    const demoNotifications = [
      { id: 1, text: "New assignment posted in Math", time: "10 min ago" },
      { id: 2, text: "Upcoming test reminder: Science", time: "1 hour ago" },
      { id: 3, text: "Your project was graded", time: "2 hours ago" },
    ]

    setNotifications(demoNotifications)
  }, [])

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>EduPortal</h1>
        </Link>
      </div>

      <div className="header-actions">
        <button
          className="icon-btn theme-toggle"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="notification-container">
          <button
            className="icon-btn notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <FaBell />
            {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
          </button>

          {showNotifications && (
            <div className="dropdown notification-dropdown glass-card">
              <h3>Notifications</h3>
              {notifications.length > 0 ? (
                <ul className="notification-list">
                  {notifications.map((notification) => (
                    <li key={notification.id} className="notification-item">
                      <p>{notification.text}</p>
                      <small>{notification.time}</small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No new notifications</p>
              )}
            </div>
          )}
        </div>

        <div className="user-menu-container">
          <button className="icon-btn user-btn" onClick={() => setShowUserMenu(!showUserMenu)} aria-label="User menu">
            <FaUser />
          </button>

          {showUserMenu && (
            <div className="dropdown user-dropdown glass-card">
              <div className="user-info">
                {/* <h3>John Doe</h3> */}
                {/* <p>Student</p> */}
              </div>
              <ul className="user-menu">
                <li>
                  <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                    <FaUser /> Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 25px;
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .logo h1 {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .icon-btn {
          background: transparent;
          border: none;
          color: var(--text-color);
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .icon-btn:hover {
          background: rgba(var(--primary-color-rgb), 0.1);
          transform: translateY(-2px);
        }
        
        .notification-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--accent-color);
          color: white;
          font-size: 0.7rem;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .notification-container, .user-menu-container {
          position: relative;
        }
        
        .dropdown {
          position: absolute;
          right: 0;
          top: 45px;
          width: 300px;
          z-index: 10;
          animation: fadeIn 0.3s ease;
        }
        
        .notification-dropdown h3, .user-dropdown h3 {
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 1rem;
        }
        
        .notification-list {
          list-style: none;
          padding: 0;
        }
        
        .notification-item {
          padding: 10px 0;
          border-bottom: 1px solid var(--border-color);
        }
        
        .notification-item:last-child {
          border-bottom: none;
        }
        
        .notification-item p {
          margin: 0 0 5px 0;
        }
        
        .notification-item small {
          color: var(--text-light);
        }
        
        .user-info {
          margin-bottom: 15px;
        }
        
        .user-info p {
          color: var(--text-light);
          margin: 0;
        }
        
        .user-menu {
          list-style: none;
          padding: 0;
        }
        
        .user-menu li {
          margin-bottom: 10px;
        }
        
        .user-menu li:last-child {
          margin-bottom: 0;
        }
        
        .user-menu a, .user-menu button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          color: var(--text-color);
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }
        
        .user-menu a:hover, .user-menu button:hover {
          color: var(--primary-color);
        }
        
        @media (max-width: 768px) {
          .dropdown {
            width: 250px;
          }
        }
      `}</style>
    </header>
  )
}

export default Header
