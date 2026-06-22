import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero.png'; // Using the existing asset

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/5 dark:bg-violet-600/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-cyan-600/5 dark:bg-cyan-600/10 rounded-full blur-[70px] pointer-events-none"></div>

      <div className="max-w-4xl z-10 flex flex-col md:flex-row items-center gap-12 px-6">
        {/* Hero Left Content */}
        <div className="flex-1 text-left flex flex-col items-start">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-650 dark:text-violet-400 border border-violet-500/20 mb-6 uppercase tracking-wider">
            🚀 GourmetScribe AI v2.0
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading leading-tight tracking-tight text-slate-900 dark:text-white mb-6">
            Appetizing Product Copy <br />
            <span className="bg-gradient-to-r from-violet-650 via-indigo-600 to-cyan-600 dark:from-violet-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
              In Seconds
            </span>
          </h1>

          <p className="text-lg text-slate-650 dark:text-gray-400 leading-relaxed max-w-lg mb-8">
            Transform food ingredients, certifications, and wholesale logistic specs into compelling, sensorially descriptive, and search-optimized product copy.
          </p>

          <button 
            onClick={() => navigate('/dashboard')}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-xl shadow-violet-600/25 hover:shadow-cyan-600/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <span>Start Generating Free</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Hero Right Image */}
        <div className="flex-1 max-w-md w-full relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-cyan-500/20 rounded-2xl filter blur-xl opacity-70"></div>
          <img 
            src={heroImage} 
            alt="AI food product description generator showcase" 
            className="relative z-10 w-full h-auto object-cover rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;