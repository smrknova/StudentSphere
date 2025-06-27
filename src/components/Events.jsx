"use client"

import { useState, useEffect } from "react"
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaSearch, FaFilter } from "react-icons/fa"

const Events = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading events from API
    setTimeout(() => {
      const demoEvents = [
        {
          id: 1,
          title: "Science Fair",
          date: "2023-05-15",
          time: "10:00 AM - 4:00 PM",
          location: "Main Hall",
          description:
            "Annual science fair showcasing student projects and innovations. Open to all students and faculty members.",
          category: "academic",
          organizer: "Science Department",
        },
        {
          id: 2,
          title: "Basketball Tournament",
          date: "2023-05-20",
          time: "2:00 PM - 6:00 PM",
          location: "Sports Complex",
          description: "Inter-class basketball tournament. Come support your class team!",
          category: "sports",
          organizer: "Sports Committee",
        },
        {
          id: 3,
          title: "Career Counseling Session",
          date: "2023-05-25",
          time: "11:00 AM - 1:00 PM",
          location: "Auditorium",
          description:
            "Career guidance session with industry professionals. Great opportunity for final year students.",
          category: "workshop",
          organizer: "Career Development Cell",
        },
        {
          id: 4,
          title: "Annual Cultural Fest",
          date: "2023-06-05",
          time: "5:00 PM - 10:00 PM",
          location: "Campus Grounds",
          description: "The biggest cultural event of the year featuring music, dance, and theatrical performances.",
          category: "cultural",
          organizer: "Student Council",
        },
        {
          id: 5,
          title: "Coding Hackathon",
          date: "2023-06-10",
          time: "9:00 AM - 9:00 PM",
          location: "Computer Lab",
          description: "24-hour coding challenge. Form teams of 3-4 and build innovative solutions.",
          category: "academic",
          organizer: "Computer Science Department",
        },
        {
          id: 6,
          title: "Alumni Meet",
          date: "2023-06-15",
          time: "6:00 PM - 9:00 PM",
          location: "Conference Hall",
          description: "Annual alumni gathering. Network with graduates and learn from their experiences.",
          category: "networking",
          organizer: "Alumni Association",
        },
      ]

      setEvents(demoEvents)
      setFilteredEvents(demoEvents)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    // Filter events based on search term and category filter
    const results = events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFilter = filter === "all" || event.category === filter

      return matchesSearch && matchesFilter
    })

    setFilteredEvents(results)
  }, [searchTerm, filter, events])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="events-page fade-in">
      <h1 className="page-title">Upcoming Events</h1>

      <div className="events-controls glass-card">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <span className="filter-label">
            <FaFilter /> Filter by:
          </span>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => handleFilterChange("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === "academic" ? "active" : ""}`}
              onClick={() => handleFilterChange("academic")}
            >
              Academic
            </button>
            <button
              className={`filter-btn ${filter === "sports" ? "active" : ""}`}
              onClick={() => handleFilterChange("sports")}
            >
              Sports
            </button>
            <button
              className={`filter-btn ${filter === "cultural" ? "active" : ""}`}
              onClick={() => handleFilterChange("cultural")}
            >
              Cultural
            </button>
            <button
              className={`filter-btn ${filter === "workshop" ? "active" : ""}`}
              onClick={() => handleFilterChange("workshop")}
            >
              Workshops
            </button>
            <button
              className={`filter-btn ${filter === "networking" ? "active" : ""}`}
              onClick={() => handleFilterChange("networking")}
            >
              Networking
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading events...</p>
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="event-card glass-card">
                <div className={`event-category ${event.category}`}>
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </div>
                <h2 className="event-title">{event.title}</h2>
                <div className="event-details">
                  <div className="event-detail">
                    <FaCalendarAlt />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="event-detail">
                    <FaClock />
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail">
                    <FaMapMarkerAlt />
                    <span>{event.location}</span>
                  </div>
                  <div className="event-detail">
                    <FaUser />
                    <span>{event.organizer}</span>
                  </div>
                </div>
                <p className="event-description">{event.description}</p>
                <div className="event-actions">
                  <button className="btn btn-primary">Register</button>
                  <button className="btn btn-secondary">Add to Calendar</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-events">
              <p>No events found matching your criteria.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm("")
                  setFilter("all")
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .events-page {
          padding-bottom: 30px;
        }
        
        .page-title {
          font-size: 1.8rem;
          margin-bottom: 25px;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .events-controls {
          margin-bottom: 25px;
          padding: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          align-items: center;
          justify-content: space-between;
        }
        
        .search-container {
          position: relative;
          flex: 1;
          min-width: 250px;
        }
        
        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
        }
        
        .search-input {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--text-color);
          font-size: 16px;
          transition: all 0.3s ease;
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }
        
        .filter-container {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .filter-label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 500;
          white-space: nowrap;
        }
        
        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .filter-btn {
          padding: 8px 15px;
          border-radius: 20px;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-color);
          font-size: 0.9rem;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        
        .filter-btn:hover {
          background: rgba(var(--primary-color-rgb), 0.05);
          border-color: var(--primary-color);
        }
        
        .filter-btn.active {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(var(--primary-color-rgb), 0.1);
          border-left-color: var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 25px;
        }
        
        .event-card {
          position: relative;
          overflow: hidden;
        }
        
        .event-category {
          position: absolute;
          top: 15px;
          right: 15px;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          color: white;
        }
        
        .event-category.academic {
          background-color: var(--primary-color);
        }
        
        .event-category.sports {
          background-color: #10b981;
        }
        
        .event-category.cultural {
          background-color: #f59e0b;
        }
        
        .event-category.workshop {
          background-color: #8b5cf6;
        }
        
        .event-category.networking {
          background-color: #0ea5e9;
        }
        
        .event-title {
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.3rem;
          padding-right: 80px;
        }
        
        .event-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 15px;
        }
        
        .event-detail {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--text-light);
        }
        
        .event-description {
          margin-bottom: 20px;
          line-height: 1.5;
        }
        
        .event-actions {
          display: flex;
          gap: 10px;
        }
        
        .no-events {
          grid-column: 1 / -1;
          text-align: center;
          padding: 50px 0;
        }
        
        .no-events p {
          margin-bottom: 20px;
          font-size: 1.1rem;
        }
        
        @media (max-width: 768px) {
          .events-controls {
            flex-direction: column;
            align-items: stretch;
          }
          
          .filter-container {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .events-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default Events
