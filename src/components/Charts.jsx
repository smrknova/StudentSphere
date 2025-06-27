"use client"

import { useState } from "react"
import { Bar, Line, Radar, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { FaChartBar, FaChartLine, FaChartPie, FaFilter } from "react-icons/fa"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
)

const Charts = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeChart, setActiveChart] = useState("performance")

  const subjects = ["Math", "Science", "History", "English", "Art", "Computer Science"]

  const performanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Performance",
        data: [75, 82, 78, 85, 90, 88],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const subjectPerformanceData = {
    labels: subjects,
    datasets: [
      {
        label: "Current Grades",
        data: [85, 92, 78, 88, 95, 90],
        backgroundColor: [
          "rgba(79, 70, 229, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(14, 165, 233, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const skillsData = {
    labels: ["Problem Solving", "Critical Thinking", "Communication", "Teamwork", "Research", "Creativity"],
    datasets: [
      {
        label: "Skills Assessment",
        data: [90, 85, 75, 80, 70, 95],
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderColor: "#4f46e5",
        pointBackgroundColor: "#4f46e5",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#4f46e5",
      },
    ],
  }

  const attendanceData = {
    labels: subjects,
    datasets: [
      {
        label: "Attendance Rate (%)",
        data: [95, 90, 100, 85, 92, 98],
        backgroundColor: [
          "rgba(79, 70, 229, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(14, 165, 233, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Poppins",
            size: 12,
          },
          color: "#6b7280",
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        titleColor: "#1f2937",
        bodyColor: "#1f2937",
        borderColor: "rgba(209, 213, 219, 0.3)",
        borderWidth: 1,
        padding: 10,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        usePointStyle: true,
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
          font: {
            family: "Poppins",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            family: "Poppins",
          },
        },
      },
    },
  }

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Poppins",
            size: 12,
          },
          color: "#6b7280",
        },
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
      r: {
        angleLines: {
          color: "rgba(209, 213, 219, 0.3)",
        },
        grid: {
          color: "rgba(209, 213, 219, 0.3)",
        },
        pointLabels: {
          color: "#6b7280",
          font: {
            family: "Poppins",
            size: 12,
          },
        },
        ticks: {
          backdropColor: "transparent",
          color: "#6b7280",
          font: {
            family: "Poppins",
            size: 10,
          },
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            family: "Poppins",
            size: 12,
          },
          color: "#6b7280",
        },
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
  }

  const renderChart = () => {
    switch (activeChart) {
      case "performance":
        return <Line data={performanceData} options={chartOptions} />
      case "subjects":
        return <Bar data={subjectPerformanceData} options={chartOptions} />
      case "skills":
        return <Radar data={skillsData} options={radarOptions} />
      case "attendance":
        return <Doughnut data={attendanceData} options={doughnutOptions} />
      default:
        return <Line data={performanceData} options={chartOptions} />
    }
  }

  const filterSubjects = (filter) => {
    setActiveFilter(filter)
    // In a real app, this would filter the data based on the selected filter
  }

  return (
    <div className="charts-page fade-in">
      <h1 className="page-title">Academic Performance Charts</h1>

      <div className="charts-controls glass-card">
        <div className="chart-tabs">
          <button
            className={`chart-tab ${activeChart === "performance" ? "active" : ""}`}
            onClick={() => setActiveChart("performance")}
          >
            <FaChartLine /> Performance Trend
          </button>
          <button
            className={`chart-tab ${activeChart === "subjects" ? "active" : ""}`}
            onClick={() => setActiveChart("subjects")}
          >
            <FaChartBar /> Subject Grades
          </button>
          <button
            className={`chart-tab ${activeChart === "skills" ? "active" : ""}`}
            onClick={() => setActiveChart("skills")}
          >
            <FaChartLine /> Skills Assessment
          </button>
          <button
            className={`chart-tab ${activeChart === "attendance" ? "active" : ""}`}
            onClick={() => setActiveChart("attendance")}
          >
            <FaChartPie /> Attendance
          </button>
        </div>

        <div className="chart-filters">
          <span className="filter-label">
            <FaFilter /> Filter:
          </span>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => filterSubjects("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${activeFilter === "semester1" ? "active" : ""}`}
              onClick={() => filterSubjects("semester1")}
            >
              Semester 1
            </button>
            <button
              className={`filter-btn ${activeFilter === "semester2" ? "active" : ""}`}
              onClick={() => filterSubjects("semester2")}
            >
              Semester 2
            </button>
          </div>
        </div>
      </div>

      <div className="chart-container glass-card">
        <div className="chart-wrapper">{renderChart()}</div>
      </div>

      <div className="chart-insights glass-card">
        <h2>Performance Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>Overall Progress</h3>
            <p>
              Your academic performance has shown consistent improvement over the past semester, with a 15% increase in
              overall grades.
            </p>
          </div>
          <div className="insight-card">
            <h3>Strongest Subject</h3>
            <p>Art stands out as your strongest subject with a 95% grade. Your creative skills are exceptional!</p>
          </div>
          <div className="insight-card">
            <h3>Area for Improvement</h3>
            <p>
              History shows potential for improvement with a current grade of 78%. Consider additional study time for
              this subject.
            </p>
          </div>
          <div className="insight-card">
            <h3>Attendance Impact</h3>
            <p>
              Your high attendance rate correlates positively with your academic performance. Keep up the good
              attendance!
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .charts-page {
          padding-bottom: 30px;
        }
        
        .page-title {
          font-size: 1.8rem;
          margin-bottom: 25px;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .charts-controls {
          margin-bottom: 25px;
          padding: 20px;
        }
        
        .chart-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .chart-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-color);
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .chart-tab:hover {
          background: rgba(var(--primary-color-rgb), 0.05);
          border-color: var(--primary-color);
        }
        
        .chart-tab.active {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }
        
        .chart-filters {
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
        }
        
        .filter-buttons {
          display: flex;
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
        
        .chart-container {
          margin-bottom: 25px;
          padding: 20px;
        }
        
        .chart-wrapper {
          height: 400px;
          position: relative;
        }
        
        .chart-insights {
          padding: 20px;
        }
        
        .chart-insights h2 {
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 1.3rem;
        }
        
        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .insight-card {
          padding: 15px;
          border-radius: 10px;
          background: rgba(var(--primary-color-rgb), 0.05);
          border-left: 3px solid var(--primary-color);
        }
        
        .insight-card h3 {
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 1rem;
          color: var(--primary-color);
        }
        
        .insight-card p {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .chart-tabs, .chart-filters {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .chart-wrapper {
            height: 300px;
          }
        }
      `}</style>
    </div>
  )
}

export default Charts
