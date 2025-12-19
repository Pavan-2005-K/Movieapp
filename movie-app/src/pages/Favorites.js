import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Favorites() {
  const [favs, setFavs] = useState([]);

  // Load favorites from localStorage on mount [cite: 49]
  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavs(savedFavs);
  }, []);

  // Remove movies from favorites with real-time UI update [cite: 45, 50]
  const removeFavorite = (id) => {
    const updatedFavs = favs.filter(movie => movie.id !== id);
    setFavs(updatedFavs);
    localStorage.setItem('favorites', JSON.stringify(updatedFavs));
  };

  const getBannerClass = (id) => {
    const classes = ['banner-purple', 'banner-orange', 'banner-blue'];
    return classes[id % classes.length];
  };

  return (
    <div className="favorites-page">
      <div className="navbar">
        <h2>🎬 Movie Explorer</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favorites">❤️ Favorites ({favs.length})</Link>
        </div>
      </div>

      <div className="search-container">
        <h1>My Favorites</h1>
        <p style={{ color: '#777' }}>Your saved collection of movies.</p>
      </div>

      {/* Responsive gallery layout [cite: 51] */}
      <div className="movie-grid">
        {favs.length > 0 ? (
          favs.map(movie => (
            <div key={movie.id} className="movie-card">
              <div className={`card-banner ${getBannerClass(movie.id)}`}>
                 <span role="img" aria-label="movie-icon">🎬</span>
              </div>
              
              <div className="card-content">
                <div className="card-header">
                  <div>
                    <h3>{movie.title}</h3>
                    <p style={{ color: '#777' }}>{movie.year}</p>
                  </div>
                  <div className="rating">⭐ {movie.rating}</div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link to={`/movie/${movie.id}`} className="details-btn" style={{ flex: 2 }}>
                    View Details
                  </Link>
                  <button 
                    onClick={() => removeFavorite(movie.id)} 
                    className="details-btn" 
                    style={{ flex: 1, background: '#ff4757' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h3>Your favorites list is empty.</h3>
            <Link to="/" style={{ color: '#9b4dca', fontWeight: 'bold' }}>Browse movies to add some!</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;