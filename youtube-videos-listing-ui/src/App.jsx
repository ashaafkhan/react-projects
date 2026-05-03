import { useState, useEffect } from 'react'
import './App.css'

function formatViews(count) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M'
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K'
  return count
}

function formatDuration(iso) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  const h = match[1] ? match[1] + ':' : ''
  const m = match[2] ? (match[1] ? match[2].padStart(2, '0') : match[2]) : '0'
  const s = match[3] ? match[3].padStart(2, '0') : '00'
  return `${h}${m}:${s}`
}

function App() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.freeapi.app/api/v1/public/youtube/videos')
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.data.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="status">Loading videos...</p>
  if (error) return <p className="status">Error: {error}</p>

  return (
    <div className="app">
      <h1 className="heading">📺 Video Library</h1>

      <div className="grid">
        {videos.map((video) => {
          const { snippet, statistics, contentDetails, id } = video.items
          const youtubeUrl = `https://www.youtube.com/watch?v=${id}`

          return (
            <a
              key={id}
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
            >
              <div className="thumbnail-wrapper">
                <img
                  src={snippet.thumbnails.medium.url}
                  alt={snippet.title}
                  className="thumbnail"
                />
                <span className="duration">{formatDuration(contentDetails.duration)}</span>
              </div>

              <div className="card-body">
                <p className="title">{snippet.title}</p>
                <p className="channel">{snippet.channelTitle}</p>
                <p className="meta">
                  <span>👁 {formatViews(statistics.viewCount)} views</span>
                  <span>👍 {formatViews(statistics.likeCount)}</span>
                </p>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default App
