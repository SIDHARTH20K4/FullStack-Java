import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddUser() {
	const [form, setForm] = React.useState({ name: '', username: '', email: '' })
	const [saving, setSaving] = React.useState(false)
	const navigate = useNavigate()

	function onChange(e) {
		const { name, value } = e.target
		setForm((f) => ({ ...f, [name]: value }))
	}

	async function onSubmit(e) {
		e.preventDefault()
		setSaving(true)
		try {
			await axios.post('http://localhost:8080/addUser', form)
			navigate('/')
		} catch (err) {
			console.error('Failed to add user', err)
			alert('Failed to add user')
		} finally {
			setSaving(false)
		}
	}

	return (
		<main style={{ padding: '1.5rem', maxWidth: 640 }}>
			<h3>Add User</h3>
			<form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.5rem' }}>
				<label>
					Name
					<input name="name" value={form.name} onChange={onChange} required />
				</label>

				<label>
					Username
					<input name="username" value={form.username} onChange={onChange} required />
				</label>

				<label>
					Email
					<input name="email" type="email" value={form.email} onChange={onChange} required />
				</label>

				<div>
					<button type="submit" disabled={saving} className="btn">
						{saving ? 'Saving…' : 'Add User'}
					</button>
				</div>
			</form>
		</main>
	)
}
