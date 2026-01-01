import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { movieData } from '../data/movies';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
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
    setIsFavorite(!isFavorite); 
  };

  if (!movie) return <div className="search-container"><h1>Movie Not Found</h1></div>;

  return (
    <div className="details-page" style={{ backgroundColor: '#f8f9ff', minHeight: '100vh' }}>
      {/* Navbar Section */}
      <div className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🎬</span> <h2 style={{margin: 0}}>Movie Explorer</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>

      {/* Main Details Container */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px' }}>
        <div className="movie-card" style={{ 
          maxWidth: '800px', 
          width: '100%', 
          borderRadius: '30px', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          backgroundColor: 'white',
          overflow: 'hidden'
        }}>
          
          {/* Header Poster/Banner Area */}
          <div style={{ position: 'relative' }}>
            <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              style={{ width: '100%', height: '400px', objectFit: 'cover' }} 
            />
            {/* Rating badge on top right of image */}
            <div style={{ 
              position: 'absolute', top: '20px', right: '20px', 
              background: 'white', padding: '5px 15px', borderRadius: '20px',
              fontWeight: '600', color: '#f1c40f', display: 'flex', alignItems: 'center', gap: '5px'
            }}>
              ⭐ {movie.rating}
            </div>
          </div>
          
          <div style={{ padding: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{movie.title} ({movie.year})</h1>
            
            <div style={{ marginBottom: '30px', color: '#444', fontSize: '1.1rem' }}>
              <p><strong>Genre:</strong> {movie.genre} | <strong>Runtime:</strong> {movie.runtime}</p>
              <p><strong>Actors:</strong> {movie.actors}</p>
              <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
              <p style={{ lineHeight: '1.6' }}><strong>Plot:</strong> {movie.plot}</p>
            </div>

            {/* Centered Buttons with Rounded Corners */}
            <div style={{ display: 'flex', gap: '20px' }}>
              <button 
                onClick={() => navigate(-1)} 
                className="details-btn" 
                style={{ 
                  background: '#777', 
                  flex: 1, 
                  borderRadius: '15px', 
                  padding: '18px',
                  boxShadow: 'none'
                }}
              >
                Back
              </button>
              <button 
                onClick={toggleFavorite} 
                className="details-btn" 
                style={{ 
                  background: isFavorite ? '#ff4757' : '#9b4dca', 
                  flex: 2, 
                  borderRadius: '15px',
                  padding: '18px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {isFavorite ? '💖 Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;