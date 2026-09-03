import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { useAuth } from '../provider/authContext.js';
import {
  Droplet,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Phone,
  ShieldCheck,
  User,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';

export default function HomeLayout() {
  const { user, signOutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const getDashboardLink = () => {
    if (!user) return '/auth/login';
    if (user.role === 'donor') return '/dashboard';
    if (user.role === 'patient') return '/dashboard/requests';
    return '/admin';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-red-500 selection:text-white">
      {/* Top Banner for Emergency */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white text-xs sm:text-sm py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-sm">
        <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-300" /> 100% Free & Charity
        </span>
        <span>Blood donation is voluntary. Never pay money for blood donations.</span>
      </div>

      {/* Main Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-red-500/25 group-hover:scale-105 transition-transform duration-200">
                <Droplet className="w-6 h-6 fill-white text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                  Blood<span className="text-red-600">Connect</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase -mt-1">
                  Life Saving Network
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive('/')
                    ? 'text-red-600 bg-red-50 font-bold'
                    : 'text-slate-600 hover:text-red-600 hover:bg-slate-100/80'
                }`}
              >
                Home
              </Link>
              <Link
                to="/awareness"
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive('/awareness')
                    ? 'text-red-600 bg-red-50 font-bold'
                    : 'text-slate-600 hover:text-red-600 hover:bg-slate-100/80'
                }`}
              >
                Awareness & Guidelines
              </Link>

              <div className="h-5 w-px bg-slate-200 mx-2" />

              {!user ? (
                <div className="flex items-center gap-2.5">
                  <Link
                    to="/auth/login"
                    className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-red-600 hover:bg-slate-100/80 rounded-lg transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-xl shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 transition-all active:scale-95"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    Become a Donor
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to={getDashboardLink()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 shadow-xs transition"
                  >
                    <LayoutDashboard className="w-4 h-4 text-red-600" />
                    Dashboard
                    <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-red-600 text-white">
                      {user.role}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={signOutUser}
                    className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              {!user ? (
                <Link
                  to="/auth/login"
                  className="text-xs font-bold px-3 py-1.5 bg-red-50 text-red-600 rounded-lg"
                >
                  Sign In
                </Link>
              ) : (
                <Link
                  to={getDashboardLink()}
                  className="text-xs font-bold px-3 py-1.5 bg-red-600 text-white rounded-lg"
                >
                  Dashboard
                </Link>
              )}
              <button
                type="button"
                className="p-2 text-slate-700 hover:text-red-600 hover:bg-slate-100 rounded-lg transition"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle Navigation Menu"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {menuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold ${
                isActive('/') ? 'bg-red-50 text-red-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Droplet className="w-5 h-5 text-red-600" /> Home
            </Link>
            <Link
              to="/awareness"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold ${
                isActive('/awareness') ? 'bg-red-50 text-red-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> Awareness & Guidelines
            </Link>

            <div className="pt-3 border-t border-slate-100">
              {!user ? (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center py-2.5 text-sm font-bold text-slate-700 bg-slate-100 rounded-xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl shadow-md"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to={getDashboardLink()}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 bg-slate-100 rounded-xl text-slate-800 font-bold"
                  >
                    <span className="flex items-center gap-2">
                      <LayoutDashboard className="w-5 h-5 text-red-600" /> Open Dashboard
                    </span>
                    <span className="text-xs uppercase bg-red-600 text-white px-2 py-0.5 rounded-md">
                      {user.role}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      signOutUser();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-bold text-sm"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Modern High-End Healthcare Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md">
                  <Droplet className="w-5 h-5 fill-white text-white" />
                </div>
                <span className="text-2xl font-black text-white tracking-tight">
                  Blood<span className="text-red-500">Connect</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                A non-profit, community-powered blood donation network connecting verified voluntary donors with patients in urgent need across Bangladesh.
              </p>
              <div className="flex items-center gap-4 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded-xl p-3 max-w-md">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>
                  <strong>Safe & Free:</strong> We never charge fees. Donating blood is an act of humanity.
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Platform Links
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/" className="hover:text-red-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/awareness" className="hover:text-red-400 transition-colors">
                    Donation Guidelines & FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/auth/register" className="hover:text-red-400 transition-colors">
                    Register as a Donor
                  </Link>
                </li>
                <li>
                  <Link to="/auth/login" className="hover:text-red-400 transition-colors">
                    Patient & Hospital Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Emergency & Support */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Emergency & Support
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Need urgent blood assistance or verification?
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-rose-400 font-semibold">
                  <Phone className="w-4 h-4" /> 24/7 Emergency Helpline
                </div>
                <div className="text-xs text-slate-400">
                  National Emergency: <strong className="text-white">999</strong>
                </div>
                <div className="text-xs text-slate-400">
                  Red Crescent Hotline: <strong className="text-white">02-9330188</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} BloodConnect Foundation. Dedicated to saving lives.</p>
            <div className="flex items-center gap-6">
              <span>Privacy-Protected</span>
              <span>•</span>
              <span>Volunteer Network</span>
              <span>•</span>
              <span>Verified Donors</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



