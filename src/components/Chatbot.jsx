"use client"

import { useState, useEffect, useRef } from "react"
import { FaPaperPlane, FaMicrophone, FaRobot, FaUser, FaTimes } from "react-icons/fa"

const Chatbot = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Initial bot message
  useEffect(() => {
    setTimeout(() => {
      addMessage({
        sender: "bot",
        text: "Hello! I'm your educational assistant. How can I help you today?",
        timestamp: new Date(),
      })
    }, 1000)
  }, [])

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message])
  }

  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Add user message
    addMessage({
      sender: "user",
      text: input,
      timestamp: new Date(),
    })

    // Clear input
    setInput("")

    // Simulate bot typing
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      setIsTyping(false)

      // Simple responses based on keywords
      let botResponse =
        "I'm not sure how to help with that yet. Could you try asking something about your courses, assignments, or schedule?"

      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        botResponse = "Hello there! How can I assist you with your studies today?"
      } else if (lowerInput.includes("assignment") || lowerInput.includes("homework")) {
        botResponse =
          "I can help you track your assignments. Your next assignment is Math Problem Set #5, due this Friday."
      } else if (lowerInput.includes("exam") || lowerInput.includes("test")) {
        botResponse =
          "You have an upcoming Science exam on May 18th. Would you like me to help you prepare with some practice questions?"
      } else if (lowerInput.includes("schedule") || lowerInput.includes("class")) {
        botResponse = "Your next class is History at 10:00 AM tomorrow in Room 203."
      } else if (lowerInput.includes("help")) {
        botResponse =
          "I can help with information about your courses, assignments, exams, and schedule. Just ask me what you'd like to know!"
      }

      addMessage({
        sender: "bot",
        text: botResponse,
        timestamp: new Date(),
      })
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    // In a real app, this would use the Web Speech API
    setIsRecording(!isRecording)

    if (!isRecording) {
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false)
        setInput("When is my next exam?")
      }, 3000)
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="chatbot-page fade-in">
      <h1 className="page-title">AI Study Assistant</h1>

      <div className="chatbot-container glass-card">
        <div className="chat-header">
          <div className="chat-bot-info">
            <div className="bot-avatar">
              <FaRobot />
            </div>
            <div className="bot-info">
              <h2>EduBot</h2>
              <p className="bot-status">Online</p>
            </div>
          </div>
          <div className="chat-actions">
            <button className="clear-chat" onClick={() => setMessages([])}>
              <FaTimes /> Clear Chat
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === "bot" ? "bot-message" : "user-message"}`}>
              <div className="message-avatar">{message.sender === "bot" ? <FaRobot /> : <FaUser />}</div>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="message-time">{formatTime(message.timestamp)}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message bot-message">
              <div className="message-avatar">
                <FaRobot />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className={`voice-btn ${isRecording ? "recording" : ""}`} onClick={toggleRecording}>
            <FaMicrophone />
          </button>
          <button className="send-btn" onClick={handleSendMessage} disabled={input.trim() === ""}>
            <FaPaperPlane />
          </button>
        </div>
      </div>

      <div className="chatbot-features glass-card">
        <h2>What can I help you with?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Course Information</h3>
            <p>Ask about your courses, schedules, and materials.</p>
            <button className="feature-btn" onClick={() => setInput("Tell me about my courses")}>
              Ask about courses
            </button>
          </div>
          <div className="feature-card">
            <h3>Assignment Tracking</h3>
            <p>Get updates on pending assignments and deadlines.</p>
            <button className="feature-btn" onClick={() => setInput("What assignments do I have due?")}>
              Check assignments
            </button>
          </div>
          <div className="feature-card">
            <h3>Exam Preparation</h3>
            <p>Get help with exam schedules and study materials.</p>
            <button className="feature-btn" onClick={() => setInput("When is my next exam?")}>
              Ask about exams
            </button>
          </div>
          <div className="feature-card">
            <h3>Study Tips</h3>
            <p>Get personalized study tips and techniques.</p>
            <button className="feature-btn" onClick={() => setInput("Give me some study tips")}>
              Get study tips
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .chatbot-page {
          padding-bottom: 30px;
        }
        
        .page-title {
          font-size: 1.8rem;
          margin-bottom: 25px;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .chatbot-container {
          margin-bottom: 25px;
          display: flex;
          flex-direction: column;
          height: 500px;
        }
        
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid var(--border-color);
        }
        
        .chat-bot-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .bot-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          color: white;
          font-size: 1.2rem;
        }
        
        .bot-info h2 {
          margin: 0;
          font-size: 1.2rem;
        }
        
        .bot-status {
          margin: 0;
          font-size: 0.8rem;
          color: var(--secondary-color);
        }
        
        .clear-chat {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 12px;
          border-radius: 5px;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-color);
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .clear-chat:hover {
          background: rgba(var(--primary-color-rgb), 0.05);
          border-color: var(--primary-color);
        }
        
        .chat-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .message {
          display: flex;
          gap: 15px;
          max-width: 80%;
        }
        
        .bot-message {
          align-self: flex-start;
        }
        
        .user-message {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        
        .message-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: var(--primary-color);
          color: white;
          font-size: 1rem;
          flex-shrink: 0;
        }
        
        .user-message .message-avatar {
          background: var(--secondary-color);
        }
        
        .message-content {
          display: flex;
          flex-direction: column;
        }
        
        .message-text {
          padding: 12px 15px;
          border-radius: 15px;
          background: rgba(var(--primary-color-rgb), 0.1);
          line-height: 1.5;
        }
        
        .user-message .message-text {
          background: var(--primary-color);
          color: white;
          border-bottom-right-radius: 0;
        }
        
        .bot-message .message-text {
          border-bottom-left-radius: 0;
        }
        
        .message-time {
          font-size: 0.8rem;
          color: var(--text-light);
          margin-top: 5px;
          align-self: flex-end;
        }
        
        .user-message .message-time {
          align-self: flex-start;
        }
        
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 15px;
          border-radius: 15px;
          background: rgba(var(--primary-color-rgb), 0.1);
          border-bottom-left-radius: 0;
        }
        
        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-light);
          animation: typing 1s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typing {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .chat-input-container {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 20px;
          border-top: 1px solid var(--border-color);
        }
        
        .chat-input {
          flex: 1;
          padding: 12px 15px;
          border-radius: 25px;
          border: 1px solid var(--border-color);
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--text-color);
          font-size: 16px;
          transition: all 0.3s ease;
        }
        
        .chat-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }
        
        .voice-btn, .send-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: none;
          color: white;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        
        .voice-btn {
          background-color: var(--secondary-color);
        }
        
        .voice-btn.recording {
          animation: pulse 1.5s infinite;
          background-color: #ef4444;
        }
        
        .send-btn {
          background-color: var(--primary-color);
        }
        
        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .voice-btn:hover, .send-btn:hover {
          transform: translateY(-2px);
        }
        
        .chatbot-features {
          padding: 20px;
        }
        
        .chatbot-features h2 {
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 1.3rem;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .feature-card {
          padding: 15px;
          border-radius: 10px;
          background: rgba(var(--primary-color-rgb), 0.05);
          border-left: 3px solid var(--primary-color);
        }
        
        .feature-card h3 {
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 1rem;
          color: var(--primary-color);
        }
        
        .feature-card p {
          margin: 0 0 15px 0;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        .feature-btn {
          padding: 8px 12px;
          border-radius: 5px;
          background: var(--primary-color);
          border: none;
          color: white;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .feature-btn:hover {
          background: var(--primary-light);
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .message {
            max-width: 90%;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default Chatbot
