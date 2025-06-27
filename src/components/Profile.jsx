"use client"
import { useState, useEffect, useRef } from "react"
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaCamera, FaTrash } from "react-icons/fa"
import axios from "axios"

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [tempProfile, setTempProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  const [userAvatars, setUserAvatars] = useState([]) 
  const fileInputRef = useRef(null)
  const email = localStorage.getItem("email")

  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) return
      
      try {
        const res = await axios.get(`http://localhost:8080/api/profile/${email}`)
        if (res.data) {
          setProfile(res.data)
          setTempProfile(res.data)
          loadUserAvatarHistory()
        } else {
          initializeEmptyProfile()
        }
      } catch (err) {
        console.log("No profile found, initializing empty profile.")
        initializeEmptyProfile()
      }
    }

    const initializeEmptyProfile = () => {
      const empty = {
        email,
        name: "",
        phone: "",
        studentId: "",
        department: "",
        year: "",
        dob: "",
        address: "",
        bio: "",
        avatar: "",
        avatarPublicId: "",
      }
      setProfile(empty)
      setTempProfile(empty)
      loadUserAvatarHistory()
    }

    fetchProfile()
  }, [email])

  const loadUserAvatarHistory = () => {
    try {
      const savedAvatars = localStorage.getItem(`avatars_${email}`)
      if (savedAvatars) {
        setUserAvatars(JSON.parse(savedAvatars))
      }
    } catch (error) {
      console.error("Error loading avatar history:", error)
      setUserAvatars([])
    }
  }

  const saveUserAvatarHistory = (avatarData) => {
    try {
      const updatedAvatars = [...userAvatars, avatarData]
      const limitedAvatars = updatedAvatars.slice(-5)
      setUserAvatars(limitedAvatars)
      localStorage.setItem(`avatars_${email}`, JSON.stringify(limitedAvatars))
    } catch (error) {
      console.error("Error saving avatar history:", error)
    }
  }

  const generateAvatarPublicId = (userEmail) => {
    const sanitizedEmail = userEmail.replace(/[@.]/g, '_')
    const timestamp = Date.now()
    return `user_avatars/user_${sanitizedEmail}_${timestamp}`
  }

  const verifyAvatarOwnership = (avatarUrl) => {
    if (!avatarUrl || !userAvatars.length) return true 
    
    return userAvatars.some(avatar => avatar.url === avatarUrl)
  }

  const getCurrentUserAvatar = () => {
    const currentAvatar = editing ? tempProfile.avatar : profile?.avatar
    
    if (!currentAvatar) return null

    const verifiedAvatar = userAvatars.find(avatar => avatar.url === currentAvatar)
    if (verifiedAvatar) return currentAvatar

    if (profile?.avatar === currentAvatar) return currentAvatar
    
    return null
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB')
      return
    }

    setUploading(true)
    setAvatarError(false)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)

      formData.append("transformation", "w_300,h_300,c_fill,g_face,q_auto,f_auto")

      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      )

      const imageUrl = uploadResponse.data.secure_url
      const uploadedPublicId = uploadResponse.data.public_id

      const avatarData = {
        url: imageUrl,
        publicId: uploadedPublicId,
        uploadedAt: new Date().toISOString(),
        userEmail: email
      }
      
      saveUserAvatarHistory(avatarData)

      setTempProfile(prev => ({
        ...prev,
        avatar: imageUrl,
        avatarPublicId: uploadedPublicId
      }))

      alert("Avatar uploaded successfully!")
    } catch (err) {
      console.error("Upload failed", err)
      alert("Upload failed. Please try again.")
      setAvatarError(true)
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveAvatar = async () => {
    if (!tempProfile.avatar) return

    const confirmRemove = window.confirm('Are you sure you want to remove your profile picture?')
    if (!confirmRemove) return

    try {
      const currentAvatarData = userAvatars.find(avatar => avatar.url === tempProfile.avatar)
      
      if (currentAvatarData?.publicId) {
        try {
          console.log("Avatar removed from profile (Cloudinary cleanup recommended)")
        } catch (deleteError) {
          console.warn("Could not delete from Cloudinary:", deleteError)
        }
      }

      setTempProfile(prev => ({
        ...prev,
        avatar: "",
        avatarPublicId: ""
      }))
      
      alert("Profile picture removed successfully!")
    } catch (err) {
      console.error("Error removing avatar:", err)
      alert("Error removing profile picture")
    }
  }

  const getUserAvatarGallery = () => {
    return userAvatars.slice().reverse() 
  }

  const selectPreviousAvatar = (avatarData) => {
    setTempProfile(prev => ({
      ...prev,
      avatar: avatarData.url,
      avatarPublicId: avatarData.publicId
    }))
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTempProfile({
      ...tempProfile,
      [name]: value,
    })
  }

  const handleSave = async () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`profile_${email}`, JSON.stringify(tempProfile))
      }


      try {
        const res = await axios.post("http://localhost:8080/api/profile", tempProfile)
        setProfile(res.data)
        setTempProfile(res.data)
      } catch (backendError) {
        console.log("Backend not available, using localStorage")
        setProfile(tempProfile)
      }

      setEditing(false)
      alert("Profile saved successfully!")
    } catch (err) {
      console.error(err)
      alert("Error saving profile")
    }
  }

  const handleCancel = () => {
    setTempProfile({ ...profile })
    setEditing(false)
    setAvatarError(false)
  }

  const renderAvatar = () => {
    const currentAvatar = getCurrentUserAvatar()
    
    if (currentAvatar && !avatarError) {
      return (
        <img 
          src={currentAvatar} 
          alt="Profile Avatar"
          className="avatar-image"
          onError={() => setAvatarError(true)}
        />
      )
    } else {
      return (
        <div className="avatar-placeholder">
          {profile?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("") || "?"}
        </div>
      )
    }
  }

  if (!tempProfile) return <div>Loading...</div>

  return (
    <div className="profile-page fade-in">
      <h1 className="page-title">My Profile</h1>
      {!profile ? (
        <p>Loading profile...</p>
      ) : (
        <div className="profile-container">
          <div className="profile-sidebar glass-card">
            <div className="profile-avatar">
              <div className="avatar-container">
                {renderAvatar()}
                {editing && (
                  <div className="avatar-overlay">
                    <button 
                      className="avatar-action-btn" 
                      onClick={triggerFileInput}
                      disabled={uploading}
                      title="Upload New Avatar"
                    >
                      {uploading ? "..." : <FaCamera />}
                    </button>
                    {(tempProfile.avatar || profile.avatar) && (
                      <button 
                        className="avatar-action-btn remove-btn" 
                        onClick={handleRemoveAvatar}
                        title="Remove Avatar"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              
              {!editing && (
                <button className="change-avatar-btn" onClick={() => setEditing(true)}>
                  Change Photo
                </button>
              )}
              
              {uploading && <p className="upload-status">Uploading...</p>}
              {avatarError && <p className="error-status">Failed to load image</p>}

              {/* Avatar Gallery - Show during editing */}
              {editing && getUserAvatarGallery().length > 0 && (
                <div className="avatar-gallery">
                  <h4>Previous Avatars</h4>
                  <div className="gallery-grid">
                    {getUserAvatarGallery().map((avatarData, index) => (
                      <div 
                        key={index}
                        className={`gallery-item ${tempProfile.avatar === avatarData.url ? 'selected' : ''}`}
                        onClick={() => selectPreviousAvatar(avatarData)}
                        title={`Uploaded on ${new Date(avatarData.uploadedAt).toLocaleDateString()}`}
                      >
                        <img 
                          src={avatarData.url}
                          alt={`Avatar ${index + 1}`}
                          className="gallery-image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <h3>Courses</h3>
                <p>6</p>
              </div>
              <div className="stat-item">
                <h3>GPA</h3>
                <p>9.3</p>
              </div>
              <div className="stat-item">
                <h3>Attendance</h3>
                <p>95%</p>
              </div>
            </div>

            <div className="profile-actions">
              {!editing ? (
                <button className="btn btn-primary" onClick={() => setEditing(true)}>
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    <FaTimes /> Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSave}>
                    <FaSave /> Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-content glass-card">
            <div className="profile-header">
              <h2>Personal Information</h2>
              {!editing && (
                <button className="edit-btn" onClick={() => setEditing(true)}>
                  <FaEdit />
                </button>
              )}
            </div>

            <div className="profile-details">
              {[
                { label: "Full Name", name: "name", icon: <FaUser />, type: "text" },
                { label: "Email", name: "email", icon: <FaEnvelope />, type: "email" },
                { label: "Phone", name: "phone", icon: <FaPhone />, type: "text" },
                { label: "Student ID", name: "studentId", icon: <FaGraduationCap />, type: "text" },
                { label: "Department", name: "department", icon: <FaGraduationCap />, type: "text" },
                { label: "Year", name: "year", icon: <FaGraduationCap />, type: "text" },
                { label: "Date of Birth", name: "dob", icon: <FaCalendarAlt />, type: "date" },
                { label: "Address", name: "address", icon: <FaUser />, type: "text" },
              ].map(({ label, name, icon, type }) => (
                <div className={`detail-item ${name === "address" ? "full-width" : ""}`} key={name}>
                  <div className="detail-icon">{icon}</div>
                  <div className="detail-content">
                    <h3>{label}</h3>
                    {editing ? (
                      <input
                        type={type}
                        name={name}
                        value={tempProfile[name] || ""}
                        onChange={handleInputChange}
                        className="edit-input"
                        disabled={name === "email"}
                      />
                    ) : (
                      <p>
                        {name === "dob" && profile.dob
                          ? new Date(profile.dob).toLocaleDateString()
                          : profile[name]}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <div className="detail-item full-width">
                <div className="detail-content">
                  <h3>Bio</h3>
                  {editing ? (
                    <textarea
                      name="bio"
                      value={tempProfile.bio}
                      onChange={handleInputChange}
                      className="edit-textarea"
                      rows="4"
                    ></textarea>
                  ) : (
                    <p>{profile.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .profile-page {
          padding-bottom: 30px;
        }
        .page-title {
          font-size: 1.8rem;
          margin-bottom: 25px;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .profile-container {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 25px;
        }
        .profile-sidebar {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 30px 20px;
        }
        .profile-avatar {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 30px;
          width: 100%;
        }
        .avatar-container {
          position: relative;
          margin-bottom: 15px;
        }
        .avatar-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(var(--primary-color-rgb), 0.3);
          transition: all 0.3s ease;
        }
        .avatar-image:hover {
          border-color: var(--primary-color);
        }
        .avatar-placeholder {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          font-weight: 700;
        }
        .avatar-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .avatar-container:hover .avatar-overlay {
          opacity: 1;
        }
        .avatar-action-btn {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--primary-color);
        }
        .avatar-action-btn:hover {
          background: white;
          transform: scale(1.1);
        }
        .avatar-action-btn.remove-btn {
          background: rgba(220, 38, 38, 0.9);
          color: white;
        }
        .avatar-action-btn.remove-btn:hover {
          background: rgb(220, 38, 38);
        }
        .avatar-action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .change-avatar-btn {
          background: transparent;
          border: none;
          color: var(--primary-color);
          font-size: 0.9rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .change-avatar-btn:hover {
          color: var(--primary-light);
          text-decoration: underline;
        }
        .upload-status {
          margin-top: 10px;
          color: var(--primary-color);
          font-size: 0.9rem;
        }
        .error-status {
          margin-top: 10px;
          color: #dc2626;
          font-size: 0.9rem;
        }
        .avatar-gallery {
          margin-top: 20px;
          width: 100%;
        }
        .avatar-gallery h4 {
          margin: 0 0 10px 0;
          font-size: 0.9rem;
          color: var(--text-light);
          text-align: center;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .gallery-item {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          position: relative;
        }
        .gallery-item:hover {
          border-color: var(--primary-color);
          transform: scale(1.05);
        }
        .gallery-item.selected {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.5);
        }
        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-stats {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 30px;
        }
        .stat-item {
          text-align: center;
          flex: 1;
        }
        .stat-item h3 {
          margin: 0 0 5px 0;
          font-size: 0.9rem;
          color: var(--text-light);
        }
        .stat-item p {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
        }
        .profile-actions {
          width: 100%;
        }
        .edit-actions {
          display: flex;
          gap: 10px;
          width: 100%;
        }
        .profile-content {
          padding: 30px;
        }
        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 1px solid var(--border-color);
        }
        .profile-header h2 {
          margin: 0;
          font-size: 1.5rem;
        }
        .edit-btn {
          background: transparent;
          border: none;
          color: var(--primary-color);
          font-size: 1.2rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .edit-btn:hover {
          color: var(--primary-light);
        }
        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .detail-item {
          display: flex;
          gap: 15px;
        }
        .detail-item.full-width {
          grid-column: 1 / -1;
        }
        .detail-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(var(--primary-color-rgb), 0.1);
          color: var(--primary-color);
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        .detail-content {
          flex: 1;
        }
        .detail-content h3 {
          margin: 0 0 5px 0;
          font-size: 0.9rem;
          color: var(--text-light);
        }
        .detail-content p {
          margin: 0;
          font-size: 1rem;
        }
        .edit-input, .edit-textarea {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid var(--border-color);
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--text-color);
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .edit-input:focus, .edit-textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }
        .edit-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .edit-textarea {
          resize: vertical;
        }
        @media (max-width: 768px) {
          .profile-container {
            grid-template-columns: 1fr;
          }
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  )
}

export default Profile