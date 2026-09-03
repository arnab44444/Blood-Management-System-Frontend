import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../provider/authContext.js';
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  Loader2,
  Heart,
  Activity,
} from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    role: 'donor',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createUser(form.email, form.password, {
        fullName: form.fullName,
        mobile: form.mobile,
        role: form.role,
      });
      navigate(form.role === 'donor' ? '/dashboard' : '/dashboard/requests');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create an Account</h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Join the voluntary life-saving blood network
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Role Selection Tabs */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          I want to register as
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, role: 'donor' }))}
            className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              form.role === 'donor'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className={`w-4 h-4 ${form.role === 'donor' ? 'fill-white' : ''}`} />
            Blood Donor
          </button>
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, role: 'patient' }))}
            className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              form.role === 'patient'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            Patient / Requester
          </button>
        </div>
      </div>

      {/* Full Name */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Full Name
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            name="fullName"
            type="text"
            placeholder="e.g. Arnab Biswas"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-slate-50/50 hover:bg-white transition-all"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Mobile Number
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            name="mobile"
            type="tel"
            placeholder="017XXXXXXXX"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-slate-50/50 hover:bg-white transition-all"
            value={form.mobile}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Email Address
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-slate-50/50 hover:bg-white transition-all"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Password (min 6 chars)
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-slate-50/50 hover:bg-white transition-all"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" /> Complete Registration
            </>
          )}
        </button>
      </div>

      <div className="text-center text-xs sm:text-sm text-slate-500 pt-1">
        Already registered?{' '}
        <Link to="/auth/login" className="font-bold text-red-600 hover:underline">
          Sign In
        </Link>
      </div>
    </form>
  );
}

