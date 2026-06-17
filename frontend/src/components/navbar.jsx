import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      color: isActive ? '#fff' : '#9ca3af',
      textDecoration: 'none',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: isActive ? '600' : '400',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
      border: '1px solid',
      borderColor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
      transition: 'all 0.2s ease'
    };
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.2rem 4rem',
      background: 'rgba(10, 11, 16, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      boxSizing: 'border-box'
    }}>
      {/* Clickable Logo */}
      <Link to="/" style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.4rem',
        fontWeight: '800',
        fontFamily: 'Outfit, sans-serif',
        background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.03em'
      }}>
        <span>🥗 GourmetScribe AI</span>
      </Link>

      {/* Navigation Links */}
      <ul style={{ 
        display: 'flex', 
        listStyle: 'none', 
        gap: '0.75rem', 
        margin: 0, 
        padding: 0,
        alignItems: 'center'
      }}>
        <li>
          <Link to="/" style={getLinkStyle('/')}>Home</Link>
        </li>
        <li>
          <Link to="/about" style={getLinkStyle('/about')}>About</Link>
        </li>
        <li>
          <Link to="/dashboard" style={getLinkStyle('/dashboard')}>Dashboard</Link>
        </li>
        <li>
          <Link to="/login" style={{
            ...getLinkStyle('/login'),
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            color: '#fff',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)',
            border: 'none'
          }}>Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;