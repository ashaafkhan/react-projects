import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.freeapi.app/api/v1/public/randomusers')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="status">Loading users...</p>
  if (error) return <p className="status">Error: {error}</p>

  return (
    <div className="app">
      <h1 className="heading">Random Users</h1>

      <div className="grid">
        {users.map((user) => (
          <div className="card" key={user.id}>
            <img
              src={user.picture.medium}
              alt={`${user.name.first} ${user.name.last}`}
              className="avatar"
            />
            <div className="card-info">
              <h2 className="name">
                {user.name.title} {user.name.first} {user.name.last}
              </h2>
              <p className="detail">📧 {user.email}</p>
              <p className="detail">📞 {user.phone}</p>
              <p className="detail">
                📍 {user.location.city}, {user.location.country}
              </p>
              <p className="detail">🎂 Age: {user.dob.age}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
