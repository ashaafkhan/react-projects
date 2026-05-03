import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.freeapi.app/api/v1/public/meals')
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.data.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="status">Loading meals...</p>
  if (error) return <p className="status">Error: {error}</p>

  return (
    <div className="app">
      <h1 className="heading">Meals Listing</h1>

      <div className="grid">
        {meals.map((meal) => (
          <div className="card" key={meal.id}>
            <img src={meal.strMealThumb} alt={meal.strMeal} className="card-img" />
            <div className="card-body">
              <h2 className="card-title">{meal.strMeal}</h2>
              <p className="card-meta">
                <span>📂 {meal.strCategory}</span>
                <span>🌍 {meal.strArea}</span>
              </p>
              {meal.strYoutube && (
                <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="card-link">
                  ▶ Watch Recipe
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
