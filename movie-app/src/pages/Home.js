import React, { useState } from 'react';
import { movieData } from '../data/movies';
import { Link } from 'react-router-dom';

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtering logic for search functionality
  const filteredMovies = movieData.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Navbar Section */}
      <div className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
           <h2 style={{margin: 0}}>Movie Explorer</h2>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-active">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>

      <div className="search-container">
        <h1>Explore Movies</h1>
        <p>Discover amazing films from Indian cinema</p>
        <div className="search-wrapper">
          <input 
            type="text" 
            className="search-bar"
            placeholder="Search for movies (e.g., Kantara)..." 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Movie Grid Section */}
      <div className="movie-grid">
        {filteredMovies.map(movie => (
          /* Entire Cart is now a Link to MovieDetails */
          <Link 
            to={`/movie/${movie.id}`} 
            key={movie.id} 
            className="card-link"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="movie-card">
              <img 
                src={movie.posterUrl} 
                alt={movie.title} 
                className="card-poster" 
              />
              
              <div className="card-content">
                <div className="card-header">
                  <div className="card-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                  </div>
                  <div className="rating">
                    ⭐ {movie.rating}
                  </div>
                </div>
                {/* Button has been removed for a cleaner 'Cart' UI */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;