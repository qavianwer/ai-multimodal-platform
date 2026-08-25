'use client';
import React, { useState } from 'react';

export default function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid passcode. Use admin123');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full space-y-4">
          <h2 className="text-xl font-bold text-white text-center">🔐 Admin Login Required</h2>
          <form onSubmit={handleLogin} className="space-y-3">
            <input 
              type="password"
              placeholder="Enter admin passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
              required
            />
            {error && <p className="text-xs text-red-400 text-center">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl text-sm transition"
            >
              Login to Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
                }
