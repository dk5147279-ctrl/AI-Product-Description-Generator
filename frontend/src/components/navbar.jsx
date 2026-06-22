import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navbar Component with responsive links and Theme Toggle.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.theme - The current active theme ('light' or 'dark')
 * @param {function} props.toggleTheme - The function callback to switch between light and dark
 * @returns {React.ReactElement} The rendered Navbar component
 */
function Navbar({ theme, toggleTheme }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 block text-center md:inline-block ${
      isActive 
        ? 'text-slate-950 dark:text-white bg-slate-200/55 dark:bg-white/5 border border-slate-300/60 dark:border-white/10' 
        : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5'
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 py-4 px-6 md:px-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* App Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-extrabold font-heading bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent tracking-tight hover:opacity-90 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span>🥗 GourmetScribe AI</span>
        </Link>

        {/* Right side containers */}
        <div className="flex items-center gap-4">
          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-3">
            <li>
              <Link to="/" className={getLinkClass('/')}>Home</Link>
            </li>
            <li>
              <Link to="/about" className={getLinkClass('/about')}>About</Link>
            </li>
            <li>
              <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
            </li>
            <li>
              <Link to="/showcase" className={getLinkClass('/showcase')}>Showcase</Link>
            </li>
            <li>
              <Link 
                to="/login" 
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:from-violet-500 hover:to-indigo-500 transition-all duration-200"
              >
                Login
              </Link>
            </li>
          </ul>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 bg-white dark:bg-white/5 text-slate-500 hover:text-slate-950 dark:text-gray-300 dark:hover:text-white transition-all cursor-pointer shadow-sm"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 text-slate-500 hover:text-slate-950 dark:text-gray-300 dark:hover:text-white transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-200 dark:border-white/5">
          <ul className="flex flex-col gap-2">
            <li>
              <Link 
                to="/" 
                className={getLinkClass('/')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={getLinkClass('/about')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard" 
                className={getLinkClass('/dashboard')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/showcase" 
                className={getLinkClass('/showcase')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Showcase
              </Link>
            </li>
            <li>
              <Link 
                to="/login" 
                className="text-sm font-semibold px-4 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg block text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;