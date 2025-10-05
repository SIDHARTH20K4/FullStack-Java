import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

export default function EditUser() {
	const { id: routeId } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [form, setForm] = useState({ name: '', userName: '', email: '' })
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)

	useEffect(() => {
		// support id in route param (/edit-user/:id) or query (?id=123)
		const qs = new URLSearchParams(location.search)
		const queryId = qs.get('id')
		const idStr = routeId ?? queryId
		const parsedId = Number(idStr)

		if (!idStr || Number.isNaN(parsedId)) {
			setLoading(false)
			return
		}

		axios
			.get(`http://localhost:8080/getUser/${parsedId}`)
			.then((res) => {
				const data = res.data || {}
				setForm({ name: data.name || '', userName: data.userName || '', email: data.email || '' })
			})
			.catch((err) => {
  				console.error('Update failed:', err);
  				console.error('response status:', err.response?.status);
  				console.error('response body:', err.response?.data);
  				alert('Failed to update user. See console for details.');
			})
			.finally(() => setLoading(false))
	}, [routeId, location.search])

	function handleChange(e) {
		const { name, value } = e.target
		setForm((s) => ({ ...s, [name]: value }))
	}

	function handleSubmit(e) {
		e.preventDefault()
		setSaving(true)
		const qs = new URLSearchParams(location.search)
		const queryId = qs.get('id')
		const idStr = routeId ?? queryId
		const parsedId = Number(idStr)

		if (!idStr || Number.isNaN(parsedId)) {
			setSaving(false)
			alert('No valid user id provided')
			return
		}

		const payload = { id: parsedId, ...form }
		console.log('PUT payload (final):', payload)
		axios
			.put(`http://localhost:8080/updateUser/${parsedId}`, JSON.stringify(payload), { headers: { 'Content-Type': 'application/json' } })
			.then(() => navigate('/'))
			.catch((err) => {
				console.error('Update failed:', err)
				console.error('response status:', err.response?.status)
				console.error('response body:', err.response?.data)
				alert('Failed to update user. See console for details.')
			})
			.finally(() => setSaving(false))
	}

	return (
		<main style={{ padding: '1.5rem' }}>
			<h3>Edit User</h3>

			{loading ? (
				<p>Loading...</p>
			) : (
				<form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
					<div style={{ marginBottom: 12 }}>
						<label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Full name</label>
						<input
							name="name"
							value={form.name}
							onChange={handleChange}
							required
							style={{ width: '100%', padding: '8px 10px' }}
						/>
					</div>

					<div style={{ marginBottom: 12 }}>
						<label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Username</label>
						<input
							name="userName"
							value={form.userName}
							onChange={handleChange}
							required
							style={{ width: '100%', padding: '8px 10px' }}
						/>
					</div>

					<div style={{ marginBottom: 12 }}>
						<label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Email</label>
						<input
							name="email"
							type="email"
							value={form.email}
							onChange={handleChange}
							required
							style={{ width: '100%', padding: '8px 10px' }}
						/>
					</div>

					<div style={{ marginTop: 14 }}>
						<button type="submit" disabled={saving} style={{ padding: '8px 14px' }}>
							{saving ? 'Saving...' : 'Save changes'}
						</button>
						<button
							type="button"
							onClick={() => navigate(-1)}
							style={{ marginLeft: 10, padding: '8px 14px' }}
						>
							Cancel
						</button>
					</div>
				</form>
			)}
		</main>
	)
}
