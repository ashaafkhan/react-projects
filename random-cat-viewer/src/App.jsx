import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [cat, setCat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCat = () => {
    setLoading(true)
    setError(null)
    fetch('https://api.freeapi.app/api/v1/public/cats/cat/random')
      .then((res) => res.json())
      .then((data) => {
        setCat(data.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchCat()
  }, [])

  return (
    <div className="app">
      <h1 className="heading">🐱 Random Cat Viewer</h1>

      {error && <p className="status">Error: {error}</p>}

      {!error && (
        <div className="card">
          {loading ? (
            <div className="img-placeholder">Loading...</div>
          ) : (
            <img src={cat.image} alt={cat.name} className="cat-img" />
          )}

          {!loading && cat && (
            <div className="info">
              <h2 className="cat-name">{cat.name}</h2>
              <p className="cat-origin">📍 {cat.origin} · ⏳ {cat.life_span} years</p>
              <p className="cat-temperament">🐾 {cat.temperament}</p>
              <p className="cat-desc">{cat.description}</p>

              <div className="traits">
                <div className="trait">
                  <span>Affection</span>
                  <div className="bar"><div className="fill" style={{ width: `${cat.affection_level * 20}%` }} /></div>
                </div>
                <div className="trait">
                  <span>Energy</span>
                  <div className="bar"><div className="fill" style={{ width: `${cat.energy_level * 20}%` }} /></div>
                </div>
                <div className="trait">
                  <span>Intelligence</span>
                  <div className="bar"><div className="fill" style={{ width: `${cat.intelligence * 20}%` }} /></div>
                </div>
                <div className="trait">
                  <span>Child Friendly</span>
                  <div className="bar"><div className="fill" style={{ width: `${cat.child_friendly * 20}%` }} /></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <button className="btn" onClick={fetchCat} disabled={loading}>
        {loading ? 'Fetching...' : '🔀 New Cat'}
      </button>
    </div>
  )
}

export default App
