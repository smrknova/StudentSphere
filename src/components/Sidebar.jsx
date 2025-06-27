"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  FaHome,
  FaUser,
  FaChartBar,
  FaCalendarAlt,
  FaRobot,
  FaEnvelope,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa"

const Sidebar = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const menuItems = [
    { path: "/", name: "Dashboard", icon: FaHome },
    { path: "/profile", name: "Profile", icon: FaUser },
    { path: "/charts", name: "Academic Charts", icon: FaChartBar },
    { path: "/events", name: "Events", icon: FaCalendarAlt },
    { path: "/chatbot", name: "Chatbot", icon: FaRobot },
    { path: "/contact", name: "Contact Us", icon: FaEnvelope },
    { path: "/about", name: "About Us", icon: FaInfoCircle },
  ]

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <button className="mobile-toggle" onClick={toggleMobileSidebar}>
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <button className="collapse-btn" onClick={toggleSidebar}>
            {collapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-status">
            <div className="status-indicator online"></div>
            <span>Online</span>
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="sidebar-overlay" onClick={toggleMobileSidebar}></div>}

      <style jsx>{`
        .sidebar {
          width: 250px;
          height: 100%;
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          transition: all var(--transition-speed);
          position: sticky;
          top: 0;
          left: 0;
          z-index: 90;
        }
        
        .sidebar.collapsed {
          width: 70px;
        }
        
        .sidebar-header {
          padding: 20px;
          display: flex;
          justify-content: flex-end;
        }
        
        .collapse-btn {
          background: transparent;
          border: none;
          color: var(--text-color);
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          border-radius: 5px;
          transition: all 0.3s ease;
        }
        
        .collapse-btn:hover {
          background: rgba(var(--primary-color-rgb), 0.1);
        }
        
        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
        }
        
        .sidebar-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .sidebar-nav li {
          margin-bottom: 5px;
        }
        
        .sidebar-nav a {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: var(--text-color);
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }
        
        .sidebar-nav a:hover {
          background: rgba(var(--primary-color-rgb), 0.1);
          border-left-color: var(--primary-light);
        }
        
        .sidebar-nav a.active {
          background: rgba(var(--primary-color-rgb), 0.15);
          border-left-color: var(--primary-color);
          font-weight: 500;
        }
        
        .sidebar-nav a svg {
          font-size: 1.2rem;
          margin-right: 15px;
          min-width: 20px;
        }
        
        .sidebar.collapsed .sidebar-nav a span {
          display: none;
        }
        
        .sidebar-footer {
          padding: 15px 20px;
          border-top: 1px solid var(--border-color);
        }
        
        .user-status {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
        }
        
        .status-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 8px;
        }
        
        .status-indicator.online {
          background-color: var(--secondary-color);
          box-shadow: 0 0 5px var(--secondary-color);
        }
        
        .sidebar.collapsed .user-status span {
          display: none;
        }
        
        .mobile-toggle {
          display: none;
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 100;
          background: var(--primary-color);
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 1.2rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        
        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 80;
        }
        
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            left: -280px;
            width: 250px;
          }
          
          .sidebar.mobile-open {
            left: 0;
          }
          
          .mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .sidebar-overlay {
            display: block;
          }
        }
      `}</style>
    </>
  )
}

export default Sidebar
