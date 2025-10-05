import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ViewUser() {
  const { id: routeId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error('Failed to load user:', err)
        alert('Failed to load user. Check console for details.')
      })
      .finally(() => setLoading(false))
  }, [routeId, location.search])

  if (loading) return <main style={{ padding: '1.5rem' }}><p>Loading...</p></main>

  if (!user) return (
    <main style={{ padding: '1.5rem' }}>
      <h3>User not found</h3>
      <button onClick={() => navigate(-1)}>Back</button>
    </main>
  )

  return (
    <main style={{ padding: '1.5rem' }}>
      <h3>View User</h3>
      <div style={{ maxWidth: 560 }}>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.userName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <div style={{ marginTop: 12 }}>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </main>
  )
}
