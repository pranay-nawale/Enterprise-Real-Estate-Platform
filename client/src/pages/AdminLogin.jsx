import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../config';

function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // If already authenticated, redirect to dashboard (must be in useEffect, not during render)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/hero', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Render nothing while redirecting
  if (isAuthenticated) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, form);
      login(res.data.token);
      navigate('/admin/hero', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-primary/60 backdrop-blur-xl border border-accent/20 shadow-2xl p-10 rounded-sm">

          {/* Brand mark */}
          <div className="flex flex-col items-center mb-10 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="border border-accent px-2 py-1 rounded-sm bg-primary-dark/50">
                <span className="text-white font-extrabold text-2xl tracking-tighter">one</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-xs font-bold tracking-widest leading-none">CODENAME</span>
                <span className="text-accent text-[10px] tracking-widest leading-none uppercase font-semibold">CHEMBUR</span>
              </div>
            </div>
            <div className="text-center pt-2">
              <p className="text-white/90 text-sm font-bold uppercase tracking-widest">CMS Admin Portal</p>
              <p className="text-white/30 text-[10px] tracking-widest mt-1 uppercase">Authorised Access Only</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-accent/15 mb-8" />

          {/* Error message */}
          {error && (
            <div className="mb-6 flex items-start space-x-3 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-sm">
              <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-400 text-xs font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" id="admin-login-form">
            {/* Username */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-white/50 mb-2">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                autoComplete="username"
                placeholder="Enter username"
                className="w-full bg-primary-dark/60 border border-accent/20 focus:border-accent text-white placeholder-white/20 px-4 py-3 text-sm outline-none transition-colors duration-200 rounded-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-white/50 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="w-full bg-primary-dark/60 border border-accent/20 focus:border-accent text-white placeholder-white/20 px-4 py-3 text-sm outline-none transition-colors duration-200 rounded-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="admin-login-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest text-xs py-4 mt-2 transition-all duration-200 shadow-lg hover:shadow-accent/20 hover:shadow-xl rounded-sm flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-[9px] text-white/20 uppercase tracking-widest mt-8">
            This portal is restricted to authorised administrators only.
          </p>
        </div>

        {/* Bottom brand tag */}
        <p className="text-center text-[9px] text-white/15 uppercase tracking-widest mt-6">
          MERN CMS v1.0.0 · Real Estate Platform
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
