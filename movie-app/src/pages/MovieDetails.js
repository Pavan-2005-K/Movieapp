import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { movieData } from '../data/movies';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Find movie from our data [cite: 35]
  const movie = movieData.find((m) => m.id === id);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favs.some(m => m.id === id));
  }, [id]);

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      favs = favs.filter(m => m.id !== id);
    } else {
      favs.push(movie);
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
    setIsFavorite(!isFavorite); // Real-time UI update [cite: 45]
  };

  if (!movie) return <div className="search-container"><h1>Movie Not Found</h1></div>;

  return (
    <div className="details-page">
      <div className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🎬</span>
          <h2 style={{ margin: 0 }}>Movie Explorer</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favorites" className="fav-btn-container">❤️ Favorites</Link>
        </div>
      </div>

      <div className="movie-grid" style={{ padding: '40px' }}>
        <div className="movie-card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <div className="card-banner banner-purple" style={{ height: '300px', fontSize: '6rem' }}>🎬</div>
          <div className="card-content" style={{ padding: '30px' }}>
            <div className="card-header">
              <h1>{movie.title} ({movie.year})</h1>
              <span className="rating">⭐ {movie.rating}</span>
            </div>
            
            <p><strong>Genre:</strong> {movie.genre} | <strong>Runtime:</strong> {movie.runtime}</p>
            <p><strong>Actors:</strong> {movie.actors}</p>
            <hr style={{ border: '0.5px solid #eee', margin: '20px 0' }} />
            <p><strong>Plot:</strong> {movie.plot}</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => navigate(-1)} className="details-btn" style={{ background: '#777', flex: 1 }}>Back</button>
              <button 
                onClick={toggleFavorite} 
                className="details-btn" 
                style={{ background: isFavorite ? '#ff4757' : '#9b4dca', flex: 2 }}
              >
                {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;