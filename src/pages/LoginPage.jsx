import { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff, LogIn, Code2 } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import { useAuth } from '../hooks/useAuth.js';

const LoginPage = ({ handlePageChange }) => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const { login, isAuthenticated, user } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect to home or admin dashboard based on role
      const destination = user.role === 'admin' ? 'admin' : 'home';
      handlePageChange(destination);
    }
  }, [isAuthenticated, user, handlePageChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        // Redirect based on role
        const destination = result.user.role === 'admin' ? 'admin' : 'home';
        setTimeout(() => handlePageChange(destination), 500);
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 relative">

      {/* Decorative glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full
          bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_65%)] blur-2xl" />
        <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full
          bg-[radial-gradient(circle,rgba(139,92,246,0.07)_0%,transparent_65%)] blur-2xl" />
        <div className="absolute inset-0 bg-grid opacity-50" />
      </div>

      <FadeInSection className="w-full max-w-md relative z-10">

        {/* Card */}
        <div
          style={{
            background: 'rgba(8,13,26,0.85)',
            border: '1px solid rgba(51,65,85,0.55)',
            borderRadius: '24px',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset',
          }}
          className="p-8 sm:p-10"
        >
          {/* Logo + heading */}
          <div className="flex flex-col items-center mb-8">
            <button
              onClick={() => handlePageChange('home')}
              className="flex items-center gap-2 mb-6 group"
              aria-label="Go to home"
            >
              <div className="p-2 bg-surface2 border border-blue-500/30 rounded-xl
                group-hover:border-blue-500/60 transition-colors">
                <Code2 className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                SSR<span className="text-blue-400">Dev</span>
              </span>
            </button>

            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 text-center">
              Welcome <span className="gradient-text">Back</span>
            </h1>
            <p className="text-sm text-slate-400 text-center">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{
                    background: 'rgba(15,23,42,0.7)',
                    border: '1px solid rgba(51,65,85,0.7)',
                    borderRadius: '12px',
                    color: '#e2e8f0',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59,130,246,0.7)';
                    e.target.style.boxShadow   = '0 0 0 3px rgba(59,130,246,0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(51,65,85,0.7)';
                    e.target.style.boxShadow   = 'none';
                  }}
                  className="w-full pl-10 pr-4 py-3 text-sm placeholder-slate-600 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="login-password" className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    background: 'rgba(15,23,42,0.7)',
                    border: '1px solid rgba(51,65,85,0.7)',
                    borderRadius: '12px',
                    color: '#e2e8f0',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59,130,246,0.7)';
                    e.target.style.boxShadow   = '0 0 0 3px rgba(59,130,246,0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(51,65,85,0.7)';
                    e.target.style.boxShadow   = 'none';
                  }}
                  className="w-full pl-10 pr-11 py-3 text-sm placeholder-slate-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forgot password row */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div
                role="alert"
                style={{
                  background: 'rgba(248,113,113,0.08)',
                  border: '1px solid rgba(248,113,113,0.25)',
                  borderRadius: '10px',
                }}
                className="px-4 py-2.5 text-sm text-red-400 font-medium text-center"
              >
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="15" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-xs text-slate-600 font-medium">OR</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500">
            Need access?{' '}
            <button
              onClick={() => handlePageChange('home')}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Contact us
            </button>
          </p>
        </div>

        {/* Subtle bottom badge */}
        <p className="text-center text-xs text-slate-700 mt-5 font-medium tracking-wide">
          SECURED BY <span className="text-slate-600">SSRDEV</span>
        </p>
      </FadeInSection>
    </div>
  );
};

export default LoginPage;
