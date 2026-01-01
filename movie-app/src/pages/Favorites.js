import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Favorites() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    // This pulls the movies you saved from localStorage
    const savedFavs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavs(savedFavs);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavs = favs.filter(movie => movie.id !== id);
    setFavs(updatedFavs);
    localStorage.setItem('favorites', JSON.stringify(updatedFavs));
  };

  return (
    <div className="favorites-page">
      <div className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
           <h2 style={{margin: 0}}>Movie Explorer</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favorites" className="nav-active">Favorites</Link>
        </div>
      </div>

      <div className="search-container">
        <h1>My Favorites</h1>
        <p style={{ color: '#777' }}>Your saved collection of movies.</p>
      </div>

      {/* This uses the CSS Grid we created to keep the 3x2 layout consistent */}
      <div className="movie-grid">
        {favs.length > 0 ? (
          favs.map(movie => (
            <div key={movie.id} className="movie-card">
              {/* Ensure the className matches what we have in App.css */}
              <img 
                src={movie.posterUrl} 
                alt={movie.title} 
                className="card-poster" 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/280x400?text=No+Poster'; }} 
              />
              
              <div className="card-content">
                <div className="card-header">
                  <div className="card-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                  </div>
                  <div className="rating">⭐ {movie.rating}</div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <Link to={`/movie/${movie.id}`} className="details-btn" style={{ flex: 2 }}>
                    View
                  </Link>
                  <button 
                    onClick={() => removeFavorite(movie.id)} 
                    className="details-btn" 
                    style={{ flex: 1.5, background: '#ff4757', boxShadow: 'none' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', marginTop: '50px', width: '100%', gridColumn: '1 / -1' }}>
            <h3>Your favorites list is empty.</h3>
            <Link to="/" style={{ color: '#9b4dca', fontWeight: 'bold' }}>Browse movies to add some!</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;