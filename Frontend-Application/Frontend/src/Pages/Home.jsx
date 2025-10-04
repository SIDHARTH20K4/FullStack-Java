import React from 'react'
import axios from 'axios'
import '../App.css'
import './Home.css'

export default function Home() {
	const [users, setUsers] = React.useState([])
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		let cancelled = false

		async function fetchUsers() {
			try {
				const res = await axios.get('http://localhost:8080/getUser')
				if (!cancelled && res && Array.isArray(res.data)) {
					setUsers(res.data)
				}
			} catch (err) {
				// keep mock data on error (backend might not be running)
				console.warn('Failed to fetch users, using mock data', err && err.message)
			} finally {
				if (!cancelled) setLoading(false)
			}
		}

		fetchUsers()
		return () => { cancelled = true }
	}, [])

	function handleDelete(id) {
		if (!confirm('Delete this user?')) return
		setUsers((u) => u.filter((x) => x.id !== id))
	}

	return (
		<section className="home-container">
			<div className="home-inner">
				<h2>Users</h2>

				<div className="table-wrap">
					{loading ? (
						<div style={{ padding: '1rem' }}>Loading users...</div>
					) : (
						<table className="users-table" role="table">
											<thead>
												<tr>
													<th>ID</th>
													<th>Name</th>
													<th>Email</th>
												</tr>
											</thead>
							<tbody>
								{users.map((u) => (
									<tr key={u.id}>
										<td>{u.id}</td>
										<td>{u.name}</td>
														<td>{u.email}</td>
									</tr>
								))}
								{users.length === 0 && (
									<tr>
														<td colSpan={3} style={{ textAlign: 'center', padding: '1rem' }}>
											No users available
										</td>
									</tr>
								)}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</section>
	)
}
