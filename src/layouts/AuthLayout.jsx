import { Outlet, Link } from 'react-router';
import { Droplet, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Glow Effects */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-red-600/40 group-hover:scale-105 transition-transform">
              <Droplet className="w-6 h-6 fill-white text-white" />
            </div>
            <span className="text-3xl font-black text-white tracking-tight">
              Blood<span className="text-red-500">Connect</span>
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
            Voluntary Life-Saving Blood Network
          </p>
        </div>

        {/* Card Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100 backdrop-blur-sm">
          <Outlet />
        </div>

        {/* Bottom Trust Badge */}
        <div className="text-center mt-6 text-xs text-slate-400 flex items-center justify-center gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Secure, Encrypted & 100% Free Humanitarian Platform</span>
        </div>
      </div>
    </div>
  );
}

