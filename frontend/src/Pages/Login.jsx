import { useState } from 'react';
import '../App.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in with: ${email}\n(This will connect to your database user auth later!)`);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh', 
      background: 'var(--bg-main)',
      fontFamily: 'var(--sans)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Background Glow */}
      <div className="glow-spot-secondary" style={{ top: '20%', right: '15%' }}></div>

      <div className="glass-card" style={{ 
        padding: '3.5rem 3rem', 
        borderRadius: '16px', 
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'rgba(18, 19, 32, 0.5)',
        borderColor: 'rgba(255, 255, 255, 0.05)',
        boxSizing: 'border-box',
        zIndex: 1
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '0.5rem', 
          color: '#fff',
          fontSize: '2rem',
          fontWeight: '800',
          fontFamily: 'Outfit, sans-serif'
        }}>
          Welcome Back
        </h2>
        <p style={{ 
          textAlign: 'center', 
          color: 'var(--text-secondary)', 
          fontSize: '0.9rem', 
          marginBottom: '2.5rem' 
        }}>
          Log in to access your GourmetScribe panel.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Email Address */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input"
              placeholder="you@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <a href="#forgot" style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none' }}>
                Forgot Password?
              </a>
            </div>
            <input 
              type="password" 
              className="form-input"
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign In Button */}
          <button 
            type="submit" 
            className="btn-primary"
            style={{ 
              padding: '0.9rem', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              marginTop: '0.5rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          fontSize: '0.85rem', 
          color: 'var(--text-secondary)' 
        }}>
          Don't have an account?{' '}
          <a href="#signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}