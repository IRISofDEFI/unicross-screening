import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login/', { username, password });
      login(data.data.officer, data.data.token);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.detail ||
        'Invalid credentials. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-4">
      {/* Wordmark */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-[#1a2332] flex items-center justify-center mb-3">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-widest text-[#1a2332] uppercase">
          Unicross Portal
        </h1>
        <p className="text-sm text-slate-500 mt-1">University of Cross River State</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Card header */}
        <div className="bg-[#1a2332] px-6 py-4">
          <h2 className="text-white font-semibold text-center text-sm tracking-wide uppercase">
            Admission Officer Login
          </h2>
        </div>

        {/* Card body */}
        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4">
          {/* Error banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-3 py-2">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-slate-300 rounded-md px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e73be] focus:border-transparent transition"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e73be] focus:border-transparent transition"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a2332] hover:bg-[#243447] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-2.5 rounded-md transition-colors mt-1"
          >
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
