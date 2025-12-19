import React, { useState } from 'react';
import { movieData } from '../data/movies';
import { Link } from 'react-router-dom';

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMovies = movieData.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Navbar Section */}
      <div className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🎬</span> <h2 style={{margin: 0}}>Movie Explorer</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favorites">❤️ Favorites (1)</Link>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h1 style={{ color: '#9b4dca', fontSize: '3rem' }}>Explore Movies</h1>
        <input 
          type="text" 
          placeholder="Search for movies (e.g., Kantara)..." 
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '60%', padding: '15px 25px', borderRadius: '30px', border: '1px solid #ddd' }}
        />
      </div>

      {/* Movie Grid Section */}
      <div className="movie-grid">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="movie-card">
            {/* Top Banner with Icon */}
            <div className={`card-banner ${movie.bannerClass}`}>
              {movie.icon}
            </div>
            
            <div className="card-content">
              <div className="card-header">
                <div>
                  <h2 style={{margin: '0 0 5px 0'}}>{movie.title}</h2>
                  <p style={{margin: 0, color: '#777'}}>{movie.year}</p>
                </div>
                <div className="rating-star">
                  ⭐ {movie.rating}
                </div>
              </div>
              
              <Link to={`/movie/${movie.id}`} className="view-details-btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;