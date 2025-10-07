import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Users() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [particles, setParticles] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    }))
    setParticles(newParticles)

    // Fetch users
    axios
      .get('http://localhost:8080/getUser')
      .then((res) => {
        setUsers(res.data)
        setFilteredUsers(res.data)
      })
      .catch((err) => {
        console.error('Failed to load users:', err)
        alert('Failed to load users. Check console for details.')
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '2rem',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    },
    particlesContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1
    },
    particle: {
      position: 'absolute',
      background: 'rgba(255, 255, 255, 0.6)',
      borderRadius: '50%',
      animation: 'float 6s ease-in-out infinite'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem',
      position: 'relative',
      zIndex: 2
    },
    title: {
      fontSize: '4rem',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #ffffff, #f0f9ff, #e0e7ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '1rem',
      textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
      animation: 'pulse 2s ease-in-out infinite alternate'
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '1.3rem',
      fontWeight: '300',
      letterSpacing: '0.5px',
      marginBottom: '2rem'
    },
    searchContainer: {
      maxWidth: '600px',
      margin: '0 auto 3rem',
      position: 'relative',
      zIndex: 2
    },
    searchInput: {
      width: '100%',
      padding: '1.5rem 2rem',
      borderRadius: '25px',
      border: 'none',
      background: 'rgba(255, 255, 255, 0.15)',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: '500',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box'
    },
    usersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    },
    userCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '25px',
      padding: '2.5rem',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      animation: 'cardSlideIn 0.6s ease-out'
    },
    cardGlow: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'left 0.6s ease'
    },
    avatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      color: 'white',
      fontWeight: '800',
      margin: '0 auto 1.5rem',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
      animation: 'avatarFloat 3s ease-in-out infinite alternate'
    },
    userName: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: 'white',
      textAlign: 'center',
      marginBottom: '0.5rem',
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
    },
    userEmail: {
      fontSize: '1rem',
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      marginBottom: '1rem'
    },
    userMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    },
    metaItem: {
      textAlign: 'center',
      flex: 1
    },
    metaLabel: {
      fontSize: '0.8rem',
      color: 'rgba(255, 255, 255, 0.6)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '0.3rem'
    },
    metaValue: {
      fontSize: '1rem',
      color: 'white',
      fontWeight: '600'
    },
    addButton: {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      fontSize: '2rem',
      cursor: 'pointer',
      boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
      transition: 'all 0.3s ease',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      color: 'white',
      position: 'relative'
    },
    spinner: {
      width: '60px',
      height: '60px',
      border: '4px solid rgba(255, 255, 255, 0.2)',
      borderTop: '4px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '2rem',
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
    },
    emptyState: {
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1.2rem',
      marginTop: '4rem'
    }
  }

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'
  }

  const createRipple = (e) => {
    const card = e.currentTarget
    const ripple = document.createElement('span')
    const rect = card.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.8s ease-out;
      pointer-events: none;
      z-index: 10;
    `
    
    card.appendChild(ripple)
    setTimeout(() => ripple.remove(), 800)
  }

  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.particlesContainer}>
        {particles.map(particle => (
          <div
            key={particle.id}
            style={{
              ...styles.particle,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.id * 0.1}s`,
              animationDuration: `${particle.speed + 4}s`
            }}
          />
        ))}
      </div>
      <div style={styles.spinner}></div>
      <p style={{ fontSize: '1.4rem', margin: 0, fontWeight: '300' }}>Loading users...</p>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(180deg); } }
        @keyframes pulse { 0% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.5); } 100% { text-shadow: 0 0 50px rgba(255, 255, 255, 0.8), 0 0 80px rgba(102, 126, 234, 0.3); } }
        @keyframes avatarFloat { 0% { transform: translateY(0px); } 100% { transform: translateY(-5px); } }
        @keyframes cardSlideIn { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes ripple { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
      `}</style>
    </div>
  )

  return (
    <div style={styles.container}>
      <div style={styles.particlesContainer}>
        {particles.map(particle => (
          <div
            key={particle.id}
            style={{
              ...styles.particle,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.id * 0.1}s`,
              animationDuration: `${particle.speed + 4}s`
            }}
          />
        ))}
      </div>

      <div style={styles.header}>
        <h1 style={styles.title}>User Management</h1>
        <p style={styles.subtitle}>Manage and view all registered users in the system</p>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔍 Search users by name, username, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
          onFocus={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)'
            e.target.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.3)'
          }}
          onBlur={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.15)'
            e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)'
          }}
        />
      </div>

      <div style={styles.usersGrid}>
        {filteredUsers.map((user, index) => (
          <div
            key={user.id}
            style={{
              ...styles.userCard,
              animationDelay: `${index * 0.1}s`
            }}
            onClick={(e) => {
              createRipple(e)
              setTimeout(() => navigate(`/users/view/${user.id}`), 200)
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px) scale(1.03)'
              e.target.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.25)'
              e.target.style.background = 'rgba(255, 255, 255, 0.18)'
              e.target.querySelector('.cardGlow').style.left = '0%'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'none'
              e.target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
              e.target.style.background = 'rgba(255, 255, 255, 0.1)'
              e.target.querySelector('.cardGlow').style.left = '-100%'
            }}
          >
            <div className="cardGlow" style={styles.cardGlow}></div>
            
            <div style={styles.avatar}>
              {getInitials(user.name)}
            </div>
            
            <h3 style={styles.userName}>{user.name}</h3>
            <p style={styles.userEmail}>{user.email}</p>
            
            <div style={styles.userMeta}>
              <div style={styles.metaItem}>
                <div style={styles.metaLabel}>ID</div>
                <div style={styles.metaValue}>#{user.id}</div>
              </div>
              <div style={styles.metaItem}>
                <div style={styles.metaLabel}>Username</div>
                <div style={styles.metaValue}>@{user.userName}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && !loading && (
        <div style={styles.emptyState}>
          <h3>🔍 No users found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}

      <button
        style={styles.addButton}
        onClick={() => navigate('/users/add')}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)'
          e.target.style.boxShadow = '0 20px 50px rgba(102, 126, 234, 0.6)'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'none'
          e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)'
        }}
        title="Add New User"
      >
        +
      </button>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(180deg); } }
        @keyframes pulse { 0% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.5); } 100% { text-shadow: 0 0 50px rgba(255, 255, 255, 0.8), 0 0 80px rgba(102, 126, 234, 0.3); } }
        @keyframes avatarFloat { 0% { transform: translateY(0px); } 100% { transform: translateY(-5px); } }
        @keyframes cardSlideIn { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes ripple { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        input::placeholder { color: rgba(255, 255, 255, 0.7); }
      `}</style>
    </div>
  )
}
      `}</style>
    </div>
  )
}
