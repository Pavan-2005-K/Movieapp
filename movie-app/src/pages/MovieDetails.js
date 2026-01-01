import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { movieData } from '../data/movies';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const movie = movieData.find((m) => m.id === id);

  // Use React state instead of localStorage
  useEffect(() => {
    // In a real app, you'd fetch this from your state management or context
    // For now, we'll just use component state
    setIsFavorite(false);
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, you'd update this in your global state/context
    // and possibly sync with a backend API
  };

  if (!movie) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f8f9ff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#9b4dca', fontSize: '2.5rem', marginBottom: '20px' }}>
            Movie Not Found
          </h1>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '12px 30px',
              background: 'linear-gradient(90deg, #4461f2, #9b4dca)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9ff', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{
        background: 'linear-gradient(90deg, #9b4dca, #e91e63)',
        padding: '15px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(155, 77, 202, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
          <span style={{ fontSize: '1.5rem' }}>🎬</span>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Movie Explorer</h2>
        </div>
        <div style={{ display: 'flex', gap: '25px' }}>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'opacity 0.3s',
            fontSize: '1rem'
          }}>
            Home
          </Link>
          <Link to="/favorites" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'opacity 0.3s',
            fontSize: '1rem'
          }}>
            Favorites
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '60px 20px',
        animation: 'fadeIn 0.6s ease-in'
      }}>
        <div style={{ 
          maxWidth: '900px', 
          width: '100%', 
          borderRadius: '24px', 
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          backgroundColor: 'white',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}>
          
          {/* Hero Image Section */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: imageLoaded ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              transition: 'opacity 0.5s ease'
            }} />
            <img 
              src={movie.posterUrl} 
              alt={movie.title}
              onLoad={() => setImageLoaded(true)}
              style={{ 
                width: '100%', 
                height: '450px', 
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.3s ease'
              }} 
            />
            
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '150px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
            }} />
            
            {/* Rating Badge */}
            <div style={{ 
              position: 'absolute', 
              top: '24px', 
              right: '24px', 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              padding: '8px 18px', 
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '1.1rem',
              color: '#2d3436',
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s ease'
            }}>
              ⭐ {movie.rating}
            </div>
          </div>
          
          {/* Content Section */}
          <div style={{ padding: '45px' }}>
            {/* Title and Year */}
            <h1 style={{ 
              fontSize: '2.5rem', 
              marginBottom: '8px',
              color: '#2d3436',
              fontWeight: '700',
              lineHeight: '1.2'
            }}>
              {movie.title}
            </h1>
            <p style={{
              fontSize: '1.3rem',
              color: '#636e72',
              fontWeight: '500',
              marginTop: '0',
              marginBottom: '30px'
            }}>
              {movie.year}
            </p>
            
            {/* Movie Info Grid */}
            <div style={{
              display: 'grid',
              gap: '20px',
              marginBottom: '35px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <span style={{ 
                  fontSize: '1.3rem',
                  minWidth: '30px'
                }}>🎭</span>
                <div>
                  <strong style={{ color: '#2d3436', fontSize: '0.95rem' }}>Genre</strong>
                  <p style={{ margin: '5px 0 0 0', color: '#636e72', fontSize: '1rem' }}>
                    {movie.genre}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <span style={{ 
                  fontSize: '1.3rem',
                  minWidth: '30px'
                }}>⏱️</span>
                <div>
                  <strong style={{ color: '#2d3436', fontSize: '0.95rem' }}>Runtime</strong>
                  <p style={{ margin: '5px 0 0 0', color: '#636e72', fontSize: '1rem' }}>
                    {movie.runtime}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <span style={{ 
                  fontSize: '1.3rem',
                  minWidth: '30px'
                }}>👥</span>
                <div>
                  <strong style={{ color: '#2d3436', fontSize: '0.95rem' }}>Cast</strong>
                  <p style={{ margin: '5px 0 0 0', color: '#636e72', fontSize: '1rem' }}>
                    {movie.actors}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ 
              height: '1px', 
              background: 'linear-gradient(to right, transparent, #e0e0e0, transparent)',
              margin: '30px 0'
            }} />

            {/* Plot */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ 
                color: '#2d3436', 
                fontSize: '1.3rem',
                marginBottom: '15px',
                fontWeight: '600'
              }}>
                📖 Synopsis
              </h3>
              <p style={{ 
                lineHeight: '1.8', 
                color: '#636e72',
                fontSize: '1.05rem',
                margin: 0
              }}>
                {movie.plot}
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => navigate(-1)} 
                style={{ 
                  background: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  flex: '1',
                  minWidth: '140px',
                  borderRadius: '14px', 
                  padding: '16px 24px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(149, 165, 166, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#7f8c8d';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(149, 165, 166, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#95a5a6';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(149, 165, 166, 0.3)';
                }}
              >
                ← Back
              </button>
              
              <button 
                onClick={toggleFavorite} 
                style={{ 
                  background: isFavorite 
                    ? 'linear-gradient(135deg, #ff4757, #ff6b81)' 
                    : 'linear-gradient(135deg, #9b4dca, #c44dca)',
                  color: 'white',
                  border: 'none',
                  flex: '2',
                  minWidth: '200px',
                  borderRadius: '14px',
                  padding: '16px 24px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  boxShadow: isFavorite 
                    ? '0 4px 15px rgba(255, 71, 87, 0.4)'
                    : '0 4px 15px rgba(155, 77, 202, 0.4)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = isFavorite 
                    ? '0 6px 25px rgba(255, 71, 87, 0.5)'
                    : '0 6px 25px rgba(155, 77, 202, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = isFavorite 
                    ? '0 4px 15px rgba(255, 71, 87, 0.4)'
                    : '0 4px 15px rgba(155, 77, 202, 0.4)';
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>
                  {isFavorite ? '💖' : '🤍'}
                </span>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        a:hover {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          nav {
            padding: 15px 20px !important;
          }
          
          h1 {
            font-size: 2rem !important;
          }
          
          div[style*="padding: 45px"] {
            padding: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default MovieDetails;