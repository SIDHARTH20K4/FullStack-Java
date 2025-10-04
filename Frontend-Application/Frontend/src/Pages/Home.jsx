import React from 'react'
import '../App.css'
import './Home.css'

const initialUsers = [
	{ id: 1, name: 'Sidharth Kumar', email: 'sidharth@example.com', role: 'Admin' },
	{ id: 2, name: 'Asha Patel', email: 'asha.patel@example.com', role: 'User' },
	{ id: 3, name: 'Ravi Singh', email: 'ravi.singh@example.com', role: 'User' },
]

export default function Home() {
	const [users, setUsers] = React.useState(initialUsers)

	function handleDelete(id) {
		if (!confirm('Delete this user?')) return
		setUsers((u) => u.filter((x) => x.id !== id))
	}

	return (
		<section className="home-container">
			<div className="home-inner">
				<h2>Users</h2>

				<div className="table-wrap">
					<table className="users-table" role="table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Email</th>
								<th>Role</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{users.map((u) => (
								<tr key={u.id}>
									<td>{u.id}</td>
									<td>{u.name}</td>
									<td>{u.email}</td>
									<td>{u.role}</td>
									<td className="actions">
										<a className="btn" href={`/view-user?id=${u.id}`}>View</a>
										<a className="btn btn-outline" href={`/edit-user?id=${u.id}`}>Edit</a>
										<button className="btn btn-danger" onClick={() => handleDelete(u.id)}>Delete</button>
									</td>
								</tr>
							))}
							{users.length === 0 && (
								<tr>
									<td colSpan={5} style={{ textAlign: 'center', padding: '1rem' }}>
										No users available
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	)
}
