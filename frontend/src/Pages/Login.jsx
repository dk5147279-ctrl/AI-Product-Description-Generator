import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in with: ${email}\n(This will connect to your database user auth later!)`);
  };

  return (
    <div className="relative min-h-[80vh] flex justify-center items-center py-12 px-6 bg-slate-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-cyan-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-lg shadow-2xl">
        <h2 className="text-center text-3xl font-extrabold font-heading text-white tracking-tight mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-400 mb-8">
          Log in to access your GourmetScribe panel.
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Email Address */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Email Address
            </label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-lg bg-white/2 border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 transition-all duration-200"
              placeholder="you@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 text-left">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Password
              </label>
              <a href="#forgot" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                Forgot Password?
              </a>
            </div>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-lg bg-white/2 border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 transition-all duration-200"
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign In Button */}
          <button 
            type="submit" 
            className="w-full py-3.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-600/20 hover:from-violet-500 hover:to-indigo-500 active:translate-y-0 hover:-translate-y-0.5 transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-8 text-xs text-gray-500">
          Don't have an account?{' '}
          <a href="#signup" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}