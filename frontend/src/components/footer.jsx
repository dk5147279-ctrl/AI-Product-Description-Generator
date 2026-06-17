import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0a0b10',
      color: 'var(--text-secondary)',
      padding: '3rem 2rem 2rem 2rem',
      textAlign: 'center',
      fontSize: '0.9rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      marginTop: 'auto',
      zIndex: 1,
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div style={{
          fontSize: '1.1rem',
          fontWeight: '700',
          fontFamily: 'Outfit, sans-serif',
          color: '#fff',
          letterSpacing: '-0.02em'
        }}>
          🥗 GourmetScribe AI
        </div>
        
        <p style={{ margin: 0, color: 'var(--text-muted)', maxWidth: '500px' }}>
          Crafting sensory, compliant, and high-converting product listing copy for modern food processors and manufacturers.
        </p>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          fontSize: '0.85rem'
        }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
          <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About</Link>
          <Link to="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Dashboard</Link>
        </div>

        <div style={{ 
          fontSize: '0.8rem', 
          color: 'var(--text-muted)',
          borderTop: '1px solid rgba(255, 255, 255, 0.03)',
          paddingTop: '1.5rem',
          width: '100%'
        }}>
          &copy; {new Date().getFullYear()} GourmetScribe AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;