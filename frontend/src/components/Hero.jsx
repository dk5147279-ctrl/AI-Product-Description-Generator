import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'relative',
      padding: '8rem 2rem 6rem 2rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Background neon glows */}
      <div className="glow-spot" style={{ top: '-10%', left: '30%' }}></div>
      <div className="glow-spot-secondary" style={{ bottom: '10%', right: '20%' }}></div>

      <div style={{ maxWidth: '800px', zIndex: 1 }}>
        {/* Subtitle Badge */}
        <span className="badge badge-primary" style={{ marginBottom: '1.5rem', fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
          🚀 Introducing GourmetScribe AI
        </span>

        {/* Heading */}
        <h1 className="gradient-text" style={{
          fontSize: '3.8rem',
          lineHeight: '1.15',
          marginBottom: '1.5rem',
          fontWeight: '800',
          letterSpacing: '-0.04em'
        }}>
          Generate AI Product Copy for Food Businesses
        </h1>

        {/* Paragraph */}
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          maxWidth: '650px',
          margin: '0 auto 2.5rem auto',
          lineHeight: '1.6'
        }}>
          Transform raw food product features, dietary specs, and ingredients into high-converting, mouth-watering copy optimized for retail, wholesale, and search rankings.
        </p>

        {/* Action Button */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="btn-primary" 
          style={{
            padding: '1rem 2.5rem',
            fontSize: '1.05rem',
            borderRadius: '9999px',
            border: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>Get Started for Free</span>
          <span style={{ fontSize: '1.15rem' }}>⚡</span>
        </button>
      </div>
    </div>
  );
}

export default Hero;