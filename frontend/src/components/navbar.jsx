import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'text-white bg-white/5 border border-white/10' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-16 py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      {/* App Logo */}
      <Link 
        to="/" 
        className="flex items-center gap-2 text-xl font-extrabold font-heading bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent tracking-tight hover:opacity-90 transition-opacity"
      >
        <span>🥗 GourmetScribe AI</span>
      </Link>

      {/* Navigation Links */}
      <ul className="flex items-center gap-3">
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
          <Link 
            to="/login" 
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:from-violet-500 hover:to-indigo-500 transition-all duration-200"
          >
            Login
          </Link>
        </li>
      </ul>

      {/* Profile/Menu Icon on the Right */}
      <div className="hidden md:flex items-center ml-4">
        <button className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 hover:border-white/20 bg-white/5 text-gray-300 hover:text-white transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;