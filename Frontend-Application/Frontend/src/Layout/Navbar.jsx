import React from 'react'
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
					<li><a href="/">Home</a></li>
					<li><a href="/users">Users</a></li>
					<li><a href="/add-user">Add User</a></li>
					<li><a href="/view-user">View User</a></li>
				</ul>
			</nav>
		</header>
	)
}

