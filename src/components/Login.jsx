"use client"

import { useState } from "react"
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa"
import Lottie from "react-lottie"
import animationData from "../assets/login-animation.json"
import axios from "axios"

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [forgotPassword, setForgotPassword] = useState(false)

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (forgotPassword) {
    alert(`Password reset link sent to ${email}`);
    setForgotPassword(false);
    return;
  }

  try {
    if (isLogin) {
      // Login
      const res = await axios.post("http://localhost:8080/admin/login", {
        email,
        password,
      });

      if (res.data === "Login successful!") {
        localStorage.setItem("email", email);
        alert("Login successful!");
        onLogin?.();
      } else {
        alert("Invalid credentials");
      }
    } else {
      // Register
      const res = await axios.post("http://localhost:8080/admin/register", {
        username,
        email,
        password,
      });

      if (res.status === 200) {
        // Auto login after successful registration
        const loginRes = await axios.post("http://localhost:8080/admin/login", {
          email,
          password,
        });

        if (loginRes.data === "Login successful!") {
          localStorage.setItem("email", email);
          alert("Account created and logged in!");
          onLogin?.();
        } else {
          alert("Account created but login failed. Please try logging in.");
          setIsLogin(true);
        }
      }
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Check your backend connection.");
  }
};


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <div className="login-container">
      <div className="login-card glass-card">
        <div className="login-animation">
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>

        <div className="login-form-container">
          <h2>{forgotPassword ? "Reset Password" : isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="subtitle">
            {forgotPassword
              ? "Enter your email to receive a password reset link"
              : isLogin
                ? "Sign in to continue to your account"
                : "Fill in your details to get started"}
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && !forgotPassword && (
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="username"
                    className="form-input"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {!forgotPassword && (
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary login-btn">
              {forgotPassword ? "Send Reset Link" : isLogin ? "Sign In" : "Sign Up"}
            </button>

            {isLogin && !forgotPassword && (
              <p className="forgot-password">
                <button type="button" onClick={() => setForgotPassword(true)} className="text-btn">
                  Forgot Password?
                </button>
              </p>
            )}
          </form>

          {forgotPassword ? (
            <p className="toggle-form">
              <button type="button" onClick={() => setForgotPassword(false)} className="text-btn">
                Back to Login
              </button>
            </p>
          ) : (
            <p className="toggle-form">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-btn">
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
        }
        
        .login-card {
          display: flex;
          width: 100%;
          max-width: 900px;
          overflow: hidden;
        }
        
        .login-animation {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        
        .login-form-container {
          flex: 1;
          padding: 40px;
        }
        
        h2 {
          margin-bottom: 10px;
          font-size: 1.8rem;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .subtitle {
          color: var(--text-light);
          margin-bottom: 30px;
        }
        
        .login-form {
          margin-bottom: 20px;
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
          padding-left: 45px;
        }
        
        .login-btn {
          width: 100%;
          margin-top: 20px;
          padding: 12px;
        }
        
        .forgot-password {
          text-align: right;
          margin-top: 10px;
        }
        
        .toggle-form {
          text-align: center;
          margin-top: 20px;
        }
        
        .text-btn {
          background: none;
          border: none;
          color: var(--primary-color);
          cursor: pointer;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .text-btn:hover {
          color: var(--primary-light);
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          .login-card {
            flex-direction: column;
          }
          
          .login-animation {
            display: none;
          }
          
          .login-form-container {
            padding: 30px;
          }
        }
      `}</style>
    </div>
  )
}

export default Login
