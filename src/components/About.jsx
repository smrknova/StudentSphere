"use client"
import { FaGraduationCap, FaUsers, FaLaptopCode, FaChalkboardTeacher, FaAward, FaHandshake } from "react-icons/fa"

const About = () => {
  const teamMembers = [
    {
      name: "Aachman Yadav",
    //   image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Smarak Gartia",
    //   image: "/placeholder.svg?height=150&width=150",
    },
    {
        name: "Nischal Chandel",
        // image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Harshit Verma",
    //   image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Kishan Garhwal",
    //   image: "/placeholder.svg?height=150&width=150",
    },
    {
        name: "Prathamesh Sarda",
        // image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Arush Srivastava",
    //   image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Dhruv Shukla",
    //   image: "/placeholder.svg?height=150&width=150",
    },
  ]

  return (
    <div className="about-page fade-in">
      <h1 className="page-title">About EduPortal</h1>

      <div className="about-intro glass-card">
        <div className="intro-content">
          <h2>Our Mission</h2>
          <p>
            At EduPortal, we're dedicated to transforming education through technology. Our platform bridges the gap
            between traditional learning and digital innovation, providing students and educators with powerful tools to
            enhance the educational experience.
          </p>
          <p>
            Founded in 2020, EduPortal has grown from a simple student management system to a comprehensive educational
            platform serving thousands of users across multiple institutions.
          </p>
        </div>
        <div className="intro-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-value">10,000+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaGraduationCap />
            </div>
            <div className="stat-value">50+</div>
            <div className="stat-label">Partner Institutions</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaAward />
            </div>
            <div className="stat-value">15+</div>
            <div className="stat-label">Industry Awards</div>
          </div>
        </div>
      </div>

      <div className="values-section">
        <h2 className="section-title">Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card glass-card">
            <div className="value-icon">
              <FaLaptopCode />
            </div>
            <h3>Innovation</h3>
            <p>We constantly push the boundaries of educational technology to create better learning experiences.</p>
          </div>
          <div className="value-card glass-card">
            <div className="value-icon">
              <FaChalkboardTeacher />
            </div>
            <h3>Education First</h3>
            <p>Every feature we develop is guided by sound educational principles and research.</p>
          </div>
          <div className="value-card glass-card">
            <div className="value-icon">
              <FaUsers />
            </div>
            <h3>Inclusivity</h3>
            <p>We design our platform to be accessible and beneficial for learners of all backgrounds and abilities.</p>
          </div>
          <div className="value-card glass-card">
            <div className="value-icon">
              <FaHandshake />
            </div>
            <h3>Collaboration</h3>
            <p>
              We believe in the power of community and foster environments where students and educators can work
              together.
            </p>
          </div>
        </div>
      </div>

      <div className="team-section glass-card">
        <h2 className="section-title">Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-image">
                <img src={member.image || "/placeholder.svg"} alt={member.name} />
              </div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="timeline-section glass-card">
        <h2 className="section-title">Our Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2020</h3>
              <p>EduPortal was founded with a vision to revolutionize educational technology.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2021</h3>
              <p>Launched our first version with basic student management features.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2022</h3>
              <p>Expanded to include advanced analytics and performance tracking.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2023</h3>
              <p>Integrated AI-powered learning assistance and personalized recommendations.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2024</h3>
              <p>Reached milestone of 10,000+ active users across 50+ educational institutions.</p>
            </div>
          </div>
        </div>
      </div> */}

      <style jsx>{`
        .about-page {
          padding-bottom: 30px;
        }
        
        .page-title {
          font-size: 1.8rem;
          margin-bottom: 25px;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .section-title {
          font-size: 1.5rem;
          margin-bottom: 25px;
          text-align: center;
        }
        
        .about-intro {
          display: flex;
          margin-bottom: 30px;
          padding: 30px;
        }
        
        .intro-content {
          flex: 1;
          padding-right: 30px;
        }
        
        .intro-content h2 {
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 1.5rem;
        }
        
        .intro-content p {
          margin-bottom: 15px;
          line-height: 1.6;
        }
        
        .intro-stats {
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 200px;
        }
        
        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
          border-radius: 10px;
          background: rgba(var(--primary-color-rgb), 0.05);
          text-align: center;
        }
        
        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          color: white;
          font-size: 1.5rem;
          margin-bottom: 10px;
        }
        
        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 5px;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: var(--text-light);
        }
        
        .values-section {
          margin-bottom: 30px;
        }
        
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .value-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 30px 20px;
          text-align: center;
        }
        
        .value-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          color: white;
          font-size: 2rem;
          margin-bottom: 20px;
        }
        
        .value-card h3 {
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.2rem;
        }
        
        .value-card p {
          margin: 0;
          line-height: 1.5;
          color: var(--text-light);
        }
        
        .team-section {
          margin-bottom: 30px;
          padding: 30px;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
        }
        
        .team-member {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .member-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 15px;
          border: 3px solid var(--primary-color);
        }
        
        .member-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .member-name {
          margin: 0 0 5px 0;
          font-size: 1.2rem;
        }
        
        .member-role {
          margin: 0 0 10px 0;
          color: var(--primary-color);
          font-weight: 500;
        }
        
        .member-bio {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--text-light);
        }
        
        .timeline-section {
          padding: 30px;
        }
        
        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding-left: 30px;
        }
        
        .timeline::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 30px;
        }
        
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        
        .timeline-dot {
          position: absolute;
          left: -34px;
          top: 5px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          border: 3px solid var(--background-color);
        }
        
        .timeline-content {
          padding-left: 15px;
        }
        
        .timeline-content h3 {
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 1.2rem;
          color: var(--primary-color);
        }
        
        .timeline-content p {
          margin: 0;
          line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .about-intro {
            flex-direction: column;
          }
          
          .intro-content {
            padding-right: 0;
            margin-bottom: 20px;
          }
          
          .intro-stats {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .stat-card {
            flex: 1;
            min-width: 120px;
          }
          
          .team-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
        }
      `}</style>
    </div>
  )
}

export default About
