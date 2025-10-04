import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
	const [open, setOpen] = React.useState(false)

	return (
		<header className="nav-header">
			<nav className="navbar" aria-label="Main navigation">
				<div className="brand">My App</div>

				<button
					className="nav-toggle"
					aria-controls="primary-navigation"
					aria-expanded={open}
					onClick={() => setOpen((v) => !v)}
				>
					<span className="sr-only">Toggle navigation</span>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>

						<ul id="primary-navigation" className={`nav-list ${open ? 'open' : ''}`}>
							<li><Link to="/">Home</Link></li>
							<li><Link to="/users">Users</Link></li>
							<li><Link to="/add-user">Add User</Link></li>
							<li><Link to="/view-user">View User</Link></li>
						</ul>
			</nav>
		</header>
	)
}

