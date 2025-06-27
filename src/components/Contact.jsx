"use client"

import { useState } from "react"
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaPaperPlane } from "react-icons/fa"
import Lottie from "react-lottie"
import animationData from "../assets/contact-animation.json"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: false,
      message: "Sending your message...",
    })

    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: "Your message has been sent successfully! We will get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: "",
        })
      }, 5000)
    }, 2000)
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <div className="contact-page fade-in">
      <h1 className="page-title">Contact Us</h1>

      <div className="contact-container">
        <div className="contact-info glass-card">
          <div className="animation-container">
            <Lottie options={defaultOptions} height={250} width={250} />
          </div>

          <h2>Get in Touch</h2>
          <p className="contact-intro">
            Have questions or need assistance? Reach out to our support team and we'll get back to you as soon as
            possible.
          </p>

          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-icon">
                <FaEnvelope />
              </div>
              <div className="method-details">
                <h3>Email Us</h3>
                <p>support@eduportal.com</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-icon">
                <FaPhone />
              </div>
              <div className="method-details">
                <h3>Call Us</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="method-details">
                <h3>Visit Us</h3>
                <p>123 Education Ave, Learning City, ED 54321</p>
              </div>
            </div>
          </div>

          <div className="office-hours">
            <h3>Office Hours</h3>
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p>Saturday: 10:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        <div className="contact-form-container glass-card">
          <h2>Send a Message</h2>

          {formStatus.submitted && formStatus.success ? (
            <div className="form-success">
              <div className="success-icon">✓</div>
              <p>{formStatus.message}</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Type your message here..."
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={formStatus.submitted && !formStatus.success}
              >
                {formStatus.submitted && !formStatus.success ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          )}

          <div className="form-footer">
            <p>We typically respond within 24-48 hours on business days.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-page {
          padding-bottom: 30px;
        }
        
        .page-title {
          font-size: 1.8rem;
          margin-bottom: 25px;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 25px;
        }
        
        .contact-info {
          padding: 30px;
          display: flex;
          flex-direction: column;
        }
        
        .animation-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .contact-info h2 {
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.5rem;
        }
        
        .contact-intro {
          margin-bottom: 30px;
          line-height: 1.6;
        }
        
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .contact-method {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .method-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          color: white;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        
        .method-details h3 {
          margin: 0 0 5px 0;
          font-size: 1.1rem;
        }
        
        .method-details p {
          margin: 0;
          color: var(--text-light);
        }
        
        .office-hours {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }
        
        .office-hours h3 {
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }
        
        .office-hours p {
          margin: 5px 0;
          color: var(--text-light);
        }
        
        .contact-form-container {
          padding: 30px;
        }
        
        .contact-form-container h2 {
          margin-top: 0;
          margin-bottom: 25px;
          font-size: 1.5rem;
        }
        
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-label {
          font-weight: 500;
        }
        
        .input-with-icon {
          position: relative;
        }
        
        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
        }
        
        .form-input {
          width: 100%;
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--text-color);
          font-size: 16px;
          transition: all 0.3s ease;
        }
        
        .input-with-icon .form-input {
          padding-left: 45px;
        }
        
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }
        
        .form-textarea {
          width: 100%;
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--text-color);
          font-size: 16px;
          resize: vertical;
          transition: all 0.3s ease;
        }
        
        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          margin-top: 10px;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .form-success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid var(--secondary-color);
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          margin: 20px 0;
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .success-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--secondary-color);
          color: white;
          font-size: 1.5rem;
          margin: 0 auto 15px;
        }
        
        .form-footer {
          margin-top: 20px;
          text-align: center;
          color: var(--text-light);
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .contact-container {
            grid-template-columns: 1fr;
          }
          
          .animation-container {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Contact
