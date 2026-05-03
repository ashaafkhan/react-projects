import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.freeapi.app/api/v1/public/quotes')
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data.data.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="status">Loading quotes...</p>
  if (error) return <p className="status">Error: {error}</p>

  return (
    <div className="app">
      <h1 className="heading">💬 Quotes</h1>

      <div className="grid">
        {quotes.map((quote) => (
          <div className="card" key={quote.id}>
            <p className="quote-text">"{quote.content}"</p>
            <div className="card-footer">
              <span className="author">— {quote.author}</span>
              {quote.tags.length > 0 && (
                <div className="tags">
                  {quote.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
