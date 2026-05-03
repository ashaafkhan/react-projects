import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fallbackImage = 'https://placehold.co/600x400?text=No+Image'

  useEffect(() => {
    fetch('https://api.freeapi.app/api/v1/public/randomproducts')
      .then((res) => res.json())
      .then((data) => {
        const list = data?.data?.data || []
        setProducts(list)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="status">Loading products...</p>
  if (error) return <p className="status">Error: {error}</p>

  return (
    <div className="app">
      <h1 className="heading">Product Listing</h1>
      <p className="subheading">Clean picks from the Products API</p>

      <div className="grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img
              src={product.thumbnail || product.images?.[0] || fallbackImage}
              alt={product.title}
              className="card-img"
              loading="lazy"
              onError={(event) => {
                if (event.currentTarget.src !== fallbackImage) {
                  event.currentTarget.src = fallbackImage
                }
              }}
            />
            <div className="card-body">
              <div className="card-top">
                <h2 className="card-title">{product.title}</h2>
                <span className="card-price">${product.price}</span>
              </div>
              <p className="card-desc">{product.description}</p>
              <div className="card-meta">
                <span>Category: {product.category}</span>
                <span>Brand: {product.brand || 'N/A'}</span>
              </div>
              <div className="card-meta">
                <span>Rating: {product.rating}</span>
                <span>Stock: {product.stock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
