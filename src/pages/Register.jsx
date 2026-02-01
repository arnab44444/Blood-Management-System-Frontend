import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../provider/authContext.js';

const ROLES = [
  { value: 'donor', label: 'Donor' },
  { value: 'patient', label: 'Patient / Blood Requester' },
];

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    role: 'donor',
  });
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
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-base-content">Register</h2>
      <p className="text-center text-sm text-base-content/60">Create your BloodConnect account</p>
      {error && <div className="alert alert-error text-sm rounded-lg">{error}</div>}
      <div className="form-control w-full">
        <label className="label py-1"><span className="label-text font-medium">Full Name</span></label>
        <input
          name="fullName"
          type="text"
          placeholder="Your full name"
          className="input input-bordered w-full input-sm sm:input-md"
          value={form.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control w-full">
        <label className="label py-1"><span className="label-text font-medium">Mobile</span></label>
        <input
          name="mobile"
          type="tel"
          placeholder="01XXXXXXXXX"
          className="input input-bordered w-full input-sm sm:input-md"
          value={form.mobile}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control w-full">
        <label className="label py-1"><span className="label-text font-medium">Email</span></label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="input input-bordered w-full input-sm sm:input-md"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control w-full">
        <label className="label py-1"><span className="label-text font-medium">Password</span></label>
        <input
          name="password"
          type="password"
          placeholder="Min 6 characters"
          className="input input-bordered w-full input-sm sm:input-md"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
        />
      </div>
      <div className="form-control w-full">
        <label className="label py-1"><span className="label-text font-medium">Register as</span></label>
        <select
          name="role"
          className="select select-bordered w-full select-sm sm:select-md"
          value={form.role}
          onChange={handleChange}
        >
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>
      <div className="pt-2">
        <button
          type="submit"
          className="btn btn-error w-full text-white btn-sm sm:btn-md"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
      <div className="divider text-sm text-base-content/60 my-2">or</div>
      <p className="text-center text-sm text-base-content/70">
        Already have an account?{' '}
        <Link to="/auth/login" className="link link-error font-medium">Login</Link>
      </p>
    </form>
  );
}
