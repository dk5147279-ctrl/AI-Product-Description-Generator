import { useState } from 'react';
import { Input, Button } from '../components/ui';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login submitted', { email, password });
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-6 py-20 flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/85 p-10 shadow-xl dark:shadow-2xl dark:shadow-black/40 backdrop-blur-xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300 mb-3 font-semibold">Welcome back</p>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Sign in to GourmetScribe AI</h1>
          <p className="mt-4 text-slate-650 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            Securely access your copy generation workspace and manage premium product storytelling workflows.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            text="Sign In"
            className="w-full py-4 text-base rounded-full"
            variant="primary"
          />
        </form>

        <div className="mt-8 text-center text-sm text-slate-500 dark:text-gray-400">
          <p>
            New to GourmetScribe? <span className="text-cyan-650 dark:text-cyan-300 font-semibold">Create an account soon</span>.
          </p>
        </div>
      </div>
    </main>
  );
}
