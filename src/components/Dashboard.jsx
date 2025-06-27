"use client"

import { useState, useEffect } from "react"
import { FaGraduationCap, FaCalendarAlt, FaBell, FaBook, FaTasks, FaChartLine } from "react-icons/fa"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const [stats, setStats] = useState({
    courses: 0,
    events: 0,
    notifications: 0,
    assignments: 0,
  })

  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Performance",
        data: [65, 70, 68, 75, 82, 90],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  })

  const [recentActivities, setRecentActivities] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])

  useEffect(() => {
    // Simulate loading data with animation
    const timer1 = setTimeout(() => {
      setStats({
        courses: 6,
        events: 8,
        notifications: 12,
        assignments: 5,
      })
    }, 500)

    // Simulate loading activities
    const timer2 = setTimeout(() => {
      setRecentActivities([
        { id: 1, title: "Submitted Math Assignment", time: "2 hours ago", icon: FaBook },
        { id: 2, title: "Completed Science Quiz", time: "1 day ago", icon: FaGraduationCap },
        { id: 3, title: "Joined History Discussion", time: "2 days ago", icon: FaBook },
      ])
    }, 800)

    // Simulate loading events
    const timer3 = setTimeout(() => {
      setUpcomingEvents([
        { id: 1, title: "Physics Lab", date: "Tomorrow, 10:00 AM", location: "Lab 101" },
        { id: 2, title: "Literature Presentation", date: "May 15, 2:00 PM", location: "Room 203" },
        { id: 3, title: "Math Final Exam", date: "May 20, 9:00 AM", location: "Exam Hall" },
      ])
    }, 1000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        titleColor: "#1f2937",
        bodyColor: "#1f2937",
        borderColor: "rgba(209, 213, 219, 0.3)",
        borderWidth: 1,
        padding: 10,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(209, 213, 219, 0.3)",
        },
        ticks: {
          color: "#6b7280",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
        },
      },
    },
  }

  return (
    <div className="dashboard fade-in">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-container grid grid-4">
        <div className="stat-card glass-card slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="stat-icon">
            <FaBook />
          </div>
          <div className="stat-content">
            <h3>Courses</h3>
            <p className="stat-value">{stats.courses}</p>
          </div>
        </div>

        <div className="stat-card glass-card slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="stat-icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-content">
            <h3>Events</h3>
            <p className="stat-value">{stats.events}</p>
          </div>
        </div>

        <div className="stat-card glass-card slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="stat-icon">
            <FaBell />
          </div>
          <div className="stat-content">
            <h3>Notifications</h3>
            <p className="stat-value">{stats.notifications}</p>
          </div>
        </div>

        <div className="stat-card glass-card slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="stat-icon">
            <FaTasks />
          </div>
          <div className="stat-content">
            <h3>Assignments</h3>
            <p className="stat-value">{stats.assignments}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content grid grid-2">
        <div className="performance-chart glass-card slide-up" style={{ animationDelay: "0.5s" }}>
          <div className="card-header">
            <h2>
              <FaChartLine /> Performance Overview
            </h2>
          </div>
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="activities-card glass-card slide-up" style={{ animationDelay: "0.6s" }}>
          <div className="card-header">
            <h2>Recent Activities</h2>
          </div>
          <ul className="activities-list">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="activity-item">
                <div className="activity-icon">
                  <activity.icon />
                </div>
                <div className="activity-content">
                  <p className="activity-title">{activity.title}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="events-card glass-card slide-up" style={{ animationDelay: "0.7s" }}>
          <div className="card-header">
            <h2>
              <FaCalendarAlt /> Upcoming Events
            </h2>
          </div>
          <ul className="events-list">
            {upcomingEvents.map((event) => (
              <li key={event.id} className="event-item">
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-date">
                    <FaCalendarAlt /> {event.date}
                  </p>
                  <p className="event-location">{event.location}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="quick-links-card glass-card slide-up" style={{ animationDelay: "0.8s" }}>
          <div className="card-header">
            <h2>Quick Links</h2>
          </div>
          <div className="quick-links">
            <button className="quick-link-btn">
              <FaBook /> Course Materials
            </button>
            <button className="quick-link-btn">
              <FaTasks /> Submit Assignment
            </button>
            <button className="quick-link-btn">
              <FaGraduationCap /> View Grades
            </button>
            <button className="quick-link-btn">
              <FaCalendarAlt /> Schedule
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          padding-bottom: 30px;
        }
        
        .page-title {
          font-size: 1.8rem;
          margin-bottom: 25px;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .stats-container {
          margin-bottom: 30px;
        }
        
        .stat-card {
          display: flex;
          align-items: center;
          padding: 20px;
        }
        
        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 12px;
          margin-right: 15px;
          font-size: 1.5rem;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          color: white;
        }
        
        .stat-content h3 {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text-light);
        }
        
        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 5px 0 0 0;
        }
        
        .dashboard-content {
          gap: 25px;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border-color);
        }
        
        .card-header h2 {
          font-size: 1.2rem;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .chart-container {
          height: 250px;
        }
        
        .activities-list, .events-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .activity-item {
          display: flex;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid var(--border-color);
        }
        
        .activity-item:last-child {
          border-bottom: none;
        }
        
        .activity-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin-right: 15px;
          font-size: 1.2rem;
          background: rgba(var(--primary-color-rgb), 0.1);
          color: var(--primary-color);
        }
        
        .activity-content {
          flex: 1;
        }
        
        .activity-title {
          margin: 0 0 5px 0;
          font-weight: 500;
        }
        
        .activity-time {
          margin: 0;
          font-size: 0.8rem;
          color: var(--text-light);
        }
        
        .event-item {
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 10px;
          background: rgba(var(--primary-color-rgb), 0.05);
          border-left: 3px solid var(--primary-color);
          transition: all 0.3s ease;
        }
        
        .event-item:hover {
          transform: translateX(5px);
          background: rgba(var(--primary-color-rgb), 0.1);
        }
        
        .event-title {
          margin: 0 0 8px 0;
          font-size: 1rem;
        }
        
        .event-date {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 5px 0;
          font-size: 0.9rem;
          color: var(--text-light);
        }
        
        .event-location {
          margin: 0;
          font-size: 0.9rem;
        }
        
        .quick-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        
        .quick-link-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px;
          border-radius: 10px;
          background: rgba(var(--primary-color-rgb), 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-color);
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .quick-link-btn:hover {
          background: rgba(var(--primary-color-rgb), 0.1);
          transform: translateY(-3px);
        }
        
        @media (max-width: 768px) {
          .quick-links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard
