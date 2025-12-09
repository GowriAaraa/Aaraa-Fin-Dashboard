import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { Lock, User, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay for better UX feel
    setTimeout(() => {
      if (username === 'admin' && password === '123') {
        onLogin();
      } else {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-black flex items-center justify-center p-4 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
            <img 
              src="https://aaraainfrastructure.com/logo.png" 
              alt="AARAA Logo" 
              className="h-16 w-auto mx-auto mb-4 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">AARAA Infrastructure</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Enterprise Finance Portal</p>
        </div>
        
        <GlassCard className="p-8 sm:p-10 shadow-xl border-white/60 dark:border-gray-800">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-apple-blue transition-colors" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue bg-gray-50/50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-900 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-apple-blue transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue bg-gray-50/50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-900 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/50 animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl shadow-lg text-sm font-semibold text-white transition-all duration-300
                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 hover:-translate-y-0.5 shadow-gray-400/20 dark:shadow-none'}
              `}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </GlassCard>
        
        <div className="mt-8 text-center space-y-2">
          <p className="text-xs text-gray-400 dark:text-gray-600 font-medium uppercase tracking-wider">Restricted Access</p>
          <p className="text-xs text-gray-300 dark:text-gray-700">© 2024 AARAA Infrastructure</p>
        </div>
      </div>
    </div>
  );
};