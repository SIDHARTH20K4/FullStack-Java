import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function EditUser() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [fetchLoading, setFetchLoading] = useState(true)
	const [particles, setParticles] = useState([])
	const [user, setUser] = useState({
		name: '',
		userName: '',
		email: ''
	})
	const [errors, setErrors] = useState({})
	const [touched, setTouched] = useState({})

	useEffect(() => {
		const newParticles = Array.from({ length: 20 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 4 + 2,
			speed: Math.random() * 2 + 1,
			opacity: Math.random() * 0.5 + 0.2
		}))
		setParticles(newParticles)

		// Fetch user data
		if (id) {
			axios
				.get(`http://localhost:8080/getUser/${id}`)
				.then((res) => setUser(res.data))
				.catch((err) => {
					console.error('Failed to load user:', err)
					alert('Failed to load user. Check console for details.')
					navigate('/users')
				})
				.finally(() => setFetchLoading(false))
		}
	}, [id, navigate])

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
		card: {
			maxWidth: '700px',
			margin: '0 auto',
			background: 'rgba(255, 255, 255, 0.1)',
			borderRadius: '30px',
			padding: '3.5rem',
			boxShadow: '0 25px 80px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
			backdropFilter: 'blur(20px)',
			border: '2px solid rgba(255, 255, 255, 0.1)',
			position: 'relative',
			zIndex: 2,
			animation: 'cardFloat 3s ease-in-out infinite alternate',
			overflow: 'hidden'
		},
		cardGlow: {
			position: 'absolute',
			top: '-50%',
			left: '-50%',
			width: '200%',
			height: '200%',
			background: 'conic-gradient(from 0deg, transparent, rgba(102, 126, 234, 0.3), transparent, rgba(118, 75, 162, 0.3), transparent)',
			animation: 'rotate 8s linear infinite',
			zIndex: -1
		},
		header: {
			textAlign: 'center',
			marginBottom: '3rem',
			position: 'relative'
		},
		title: {
			fontSize: '3rem',
			fontWeight: '800',
			background: 'linear-gradient(135deg, #ffffff, #f0f9ff, #e0e7ff)',
			WebkitBackgroundClip: 'text',
			WebkitTextFillColor: 'transparent',
			marginBottom: '0.5rem',
			textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
			animation: 'pulse 2s ease-in-out infinite alternate'
		},
		subtitle: {
			color: 'rgba(255, 255, 255, 0.8)',
			fontSize: '1.2rem',
			fontWeight: '300',
			letterSpacing: '0.5px'
		},
		icon: {
			width: '120px',
			height: '120px',
			borderRadius: '50%',
			margin: '0 auto 2rem',
			background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontSize: '3.5rem',
			color: 'white',
			fontWeight: '900',
			boxShadow: '0 15px 50px rgba(102, 126, 234, 0.4), 0 0 0 4px rgba(255, 255, 255, 0.1)',
			animation: 'avatarPulse 2s ease-in-out infinite alternate'
		},
		form: {
			display: 'grid',
			gap: '2rem'
		},
		inputGroup: {
			position: 'relative'
		},
		label: {
			display: 'block',
			fontSize: '0.9rem',
			fontWeight: '700',
			color: 'rgba(255, 255, 255, 0.9)',
			textTransform: 'uppercase',
			letterSpacing: '0.1em',
			marginBottom: '0.8rem'
		},
		input: {
			width: '100%',
			padding: '1.2rem 1.5rem',
			borderRadius: '15px',
			border: '2px solid rgba(255, 255, 255, 0.2)',
			background: 'rgba(255, 255, 255, 0.1)',
			color: 'white',
			fontSize: '1.1rem',
			fontWeight: '500',
			backdropFilter: 'blur(10px)',
			transition: 'all 0.3s ease',
			outline: 'none',
			boxSizing: 'border-box'
		},
		inputError: {
			border: '2px solid rgba(239, 68, 68, 0.7)',
			background: 'rgba(239, 68, 68, 0.1)'
		},
		errorMessage: {
			color: '#fecaca',
			fontSize: '0.85rem',
			marginTop: '0.5rem',
			fontWeight: '500',
			animation: 'slideIn 0.3s ease'
		},
		buttonContainer: {
			display: 'flex',
			gap: '1.5rem',
			justifyContent: 'center',
			marginTop: '2rem'
		},
		button: {
			padding: '15px 30px',
			borderRadius: '50px',
			border: 'none',
			fontSize: '1.1rem',
			fontWeight: '700',
			cursor: 'pointer',
			transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
			textDecoration: 'none',
			display: 'inline-flex',
			alignItems: 'center',
			gap: '0.8rem',
			position: 'relative',
			overflow: 'hidden',
			letterSpacing: '0.5px',
			minWidth: '150px',
			justifyContent: 'center'
		},
		primaryButton: {
			background: 'linear-gradient(135deg, #667eea, #764ba2)',
			color: 'white',
			boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
		},
		secondaryButton: {
			background: 'rgba(255, 255, 255, 0.1)',
			color: 'white',
			border: '2px solid rgba(255, 255, 255, 0.2)',
			backdropFilter: 'blur(10px)'
		},
		loadingSpinner: {
			width: '20px',
			height: '20px',
			border: '2px solid rgba(255, 255, 255, 0.3)',
			borderTop: '2px solid white',
			borderRadius: '50%',
			animation: 'spin 1s linear infinite'
		}
	}

	const validateField = (name, value) => {
		switch (name) {
			case 'name':
				if (!value.trim()) return 'Name is required'
				if (value.trim().length < 2) return 'Name must be at least 2 characters'
				return ''
			case 'userName':
				if (!value.trim()) return 'Username is required'
				if (value.trim().length < 3) return 'Username must be at least 3 characters'
				if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores'
				return ''
			case 'email':
				if (!value.trim()) return 'Email is required'
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address'
				return ''
			default:
				return ''
		}
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setUser(prev => ({ ...prev, [name]: value }))
		
		if (touched[name]) {
			const error = validateField(name, value)
			setErrors(prev => ({ ...prev, [name]: error }))
		}
	}

	const handleInputBlur = (e) => {
		const { name, value } = e.target
		setTouched(prev => ({ ...prev, [name]: true }))
		const error = validateField(name, value)
		setErrors(prev => ({ ...prev, [name]: error }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		
		const newErrors = {}
		Object.keys(user).forEach(key => {
			if (key !== 'id') {
				const error = validateField(key, user[key])
				if (error) newErrors[key] = error
			}
		})
		
		setErrors(newErrors)
		setTouched({ name: true, userName: true, email: true })
		
		if (Object.keys(newErrors).length > 0) return

		setLoading(true)
		
		try {
			await axios.put(`http://localhost:8080/updateUser/${id}`, user)
			setTimeout(() => {
				navigate(`/users/view/${id}`)
			}, 500)
		} catch (err) {
			console.error('Failed to update user:', err)
			alert('Failed to update user. Check console for details.')
			setLoading(false)
		}
	}

	const createRipple = (e) => {
		const button = e.currentTarget
		const ripple = document.createElement('span')
		const rect = button.getBoundingClientRect()
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
			animation: ripple 0.6s ease-out;
			pointer-events: none;
		`
		
		button.appendChild(ripple)
		setTimeout(() => ripple.remove(), 600)
	}

	const getInitials = (name) => {
		return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '✏️'
	}

	if (fetchLoading) return (
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
							animationDelay: `${particle.id * 0.2}s`,
							animationDuration: `${particle.speed + 4}s`
						}}
					/>
				))}
			</div>
			<div style={styles.card}>
				<div style={{ textAlign: 'center', color: 'white' }}>
					<div style={styles.loadingSpinner}></div>
					<p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Loading user data...</p>
				</div>
			</div>
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
							animationDelay: `${particle.id * 0.2}s`,
							animationDuration: `${particle.speed + 4}s`
						}}
					/>
				))}
			</div>

			<div style={styles.card}>
				<div style={styles.cardGlow}></div>
				<div style={styles.header}>
					<div style={styles.icon}>
						{getInitials(user.name)}
					</div>
					<h1 style={styles.title}>Edit User</h1>
					<p style={styles.subtitle}>Update user information with beautiful form</p>
				</div>

				<form style={styles.form} onSubmit={handleSubmit}>
					<div style={styles.inputGroup}>
						<label style={styles.label}>Full Name</label>
						<input
							type="text"
							name="name"
							value={user.name}
							onChange={handleInputChange}
							onFocus={(e) => {
								e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)'
								e.target.style.background = 'rgba(255, 255, 255, 0.15)'
								e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)'
								e.target.style.transform = 'translateY(-2px)'
							}}
							onBlur={(e) => {
								handleInputBlur(e)
								e.target.style.border = errors.name ? '2px solid rgba(239, 68, 68, 0.7)' : '2px solid rgba(255, 255, 255, 0.2)'
								e.target.style.background = errors.name ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.1)'
								e.target.style.boxShadow = 'none'
								e.target.style.transform = 'none'
							}}
							style={{
								...styles.input,
								...(errors.name ? styles.inputError : {})
							}}
							placeholder="Enter full name..."
						/>
						{errors.name && <div style={styles.errorMessage}>{errors.name}</div>}
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>Username</label>
						<input
							type="text"
							name="userName"
							value={user.userName}
							onChange={handleInputChange}
							onFocus={(e) => {
								e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)'
								e.target.style.background = 'rgba(255, 255, 255, 0.15)'
								e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)'
								e.target.style.transform = 'translateY(-2px)'
							}}
							onBlur={(e) => {
								handleInputBlur(e)
								e.target.style.border = errors.userName ? '2px solid rgba(239, 68, 68, 0.7)' : '2px solid rgba(255, 255, 255, 0.2)'
								e.target.style.background = errors.userName ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.1)'
								e.target.style.boxShadow = 'none'
								e.target.style.transform = 'none'
							}}
							style={{
								...styles.input,
								...(errors.userName ? styles.inputError : {})
							}}
							placeholder="Enter username..."
						/>
						{errors.userName && <div style={styles.errorMessage}>{errors.userName}</div>}
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>Email Address</label>
						<input
							type="email"
							name="email"
							value={user.email}
							onChange={handleInputChange}
							onFocus={(e) => {
								e.target.style.border = '2px solid rgba(255, 255, 255, 0.5)'
								e.target.style.background = 'rgba(255, 255, 255, 0.15)'
								e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)'
								e.target.style.transform = 'translateY(-2px)'
							}}
							onBlur={(e) => {
								handleInputBlur(e)
								e.target.style.border = errors.email ? '2px solid rgba(239, 68, 68, 0.7)' : '2px solid rgba(255, 255, 255, 0.2)'
								e.target.style.background = errors.email ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.1)'
								e.target.style.boxShadow = 'none'
								e.target.style.transform = 'none'
							}}
							style={{
								...styles.input,
								...(errors.email ? styles.inputError : {})
							}}
							placeholder="Enter email address..."
						/>
						{errors.email && <div style={styles.errorMessage}>{errors.email}</div>}
					</div>

					<div style={styles.buttonContainer}>
						<button 
							type="submit"
							disabled={loading}
							onClick={(e) => !loading && createRipple(e)}
							style={{
								...styles.button, 
								...styles.primaryButton,
								opacity: loading ? 0.7 : 1,
								cursor: loading ? 'not-allowed' : 'pointer'
							}}
							onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-5px) scale(1.05)')}
							onMouseLeave={(e) => !loading && (e.target.style.transform = 'none')}
						>
							{loading ? (
								<>
									<div style={styles.loadingSpinner}></div>
									Updating...
								</>
							) : (
								<>
									💾 Update User
								</>
							)}
						</button>
						<button 
							type="button"
							onClick={(e) => { createRipple(e); navigate(-1); }}
							style={{...styles.button, ...styles.secondaryButton}}
							onMouseEnter={(e) => {
								e.target.style.background = 'rgba(255, 255, 255, 0.2)'
								e.target.style.transform = 'translateY(-5px) scale(1.05)'
								e.target.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)'
							}}
							onMouseLeave={(e) => {
								e.target.style.background = 'rgba(255, 255, 255, 0.1)'
								e.target.style.transform = 'none'
								e.target.style.boxShadow = 'none'
							}}
						>
							← Cancel
						</button>
					</div>
				</form>
			</div>

			<style>{`
				@keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(180deg); } }
				@keyframes cardFloat { 0% { transform: translateY(0px); } 100% { transform: translateY(-10px); } }
				@keyframes pulse { 0% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.5); } 100% { text-shadow: 0 0 50px rgba(255, 255, 255, 0.8), 0 0 80px rgba(102, 126, 234, 0.3); } }
				@keyframes avatarPulse { 0% { box-shadow: 0 15px 50px rgba(102, 126, 234, 0.4), 0 0 0 4px rgba(255, 255, 255, 0.1); } 100% { box-shadow: 0 20px 70px rgba(102, 126, 234, 0.6), 0 0 0 6px rgba(255, 255, 255, 0.2); } }
				@keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
				@keyframes ripple { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
				@keyframes slideIn { 0% { opacity: 0; transform: translateY(-10px); } 100% { opacity: 1; transform: translateY(0); } }
				@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
				
				input::placeholder { color: rgba(255, 255, 255, 0.6); }
			`}</style>
		</div>
	)
}
