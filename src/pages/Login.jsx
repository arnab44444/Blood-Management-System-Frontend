import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../provider/authContext.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInUser(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-center text-base-content">Login</h2>
      <p className="text-center text-sm text-base-content/60">Sign in to your account</p>
      {error && <div className="alert alert-error text-sm rounded-lg">{error}</div>}
      <div className="form-control w-full">
        <label className="label py-1"><span className="label-text font-medium">Email</span></label>
        <input
          type="email"
          placeholder="you@example.com"
          className="input input-bordered w-full input-sm sm:input-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-control w-full">
        <label className="label py-1"><span className="label-text font-medium">Password</span></label>
        <input
          type="password"
          placeholder="••••••••"
          className="input input-bordered w-full input-sm sm:input-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          className="btn btn-error w-full text-white btn-sm sm:btn-md"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      <div className="divider text-sm text-base-content/60 my-2">or</div>
      <p className="text-center text-sm text-base-content/70">
        Don&apos;t have an account?{' '}
        <Link to="/auth/register" className="link link-error font-medium">Register</Link>
      </p>
    </form>
  );
}

// const HERO_SLIDES = [
//   'https://i.ibb.co/WvYMhvWc/2025-10-071228336.jpg',
//   'https://i.ibb.co/jP7XS8L2/pngtree-world-blood-donor-day-with-bag-and-2-hearts-png-image-6379969.jpg',
//   'https://i.ibb.co.com/nsssGTR1/1686982617-6.jpg',
// ];