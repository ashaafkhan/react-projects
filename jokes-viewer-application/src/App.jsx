import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [jokes, setJokes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.freeapi.app/api/v1/public/randomjokes')
      .then((res) => res.json())
      .then((data) => {
        setJokes(data.data.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="status">Loading jokes...</p>
  if (error) return <p className="status">Error: {error}</p>

  return (
    <div className="app">
      <h1 className="heading">😂 Jokes Viewer</h1>

      <div className="grid">
        {jokes.map((joke) => (
          <div className="card" key={joke.id}>
            <p className="joke-text">{joke.content}</p>
            <div className="card-footer">
              <span className="joke-id">#{joke.id}</span>
              {joke.categories.length > 0 && (
                <span className="badge">{joke.categories[0]}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
