import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { useAuth } from '../provider/authContext.js';
import {
  Droplet,
  Home,
  User,
  Calendar,
  CalendarCheck,
  Bell,
  History,
  PlusCircle,
  Search,
  FileText,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Heart,
  Activity,
} from 'lucide-react';

export default function DashboardLayout() {
  const { user, signOutUser } = useAuth();
  const loc = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const donorNav = [
    { to: '/dashboard', label: 'Overview', icon: Home },
    { to: '/dashboard/profile', label: 'My Profile', icon: User },
    { to: '/dashboard/availability', label: 'Availability', icon: Calendar },
    { to: '/dashboard/upcoming-booking', label: 'Upcoming Booking', icon: CalendarCheck },
    { to: '/dashboard/notifications', label: 'Blood Requests', icon: Bell },
    { to: '/dashboard/donation-history', label: 'Donation History', icon: History },
  ];

  const patientNav = [
    { to: '/dashboard/requests', label: 'My Requests', icon: FileText },
    { to: '/dashboard/request-blood', label: 'Request Blood', icon: PlusCircle },
    { to: '/dashboard/search-donors', label: 'Search Donors', icon: Search },
  ];

  const nav = user?.role === 'donor' ? donorNav : user?.role === 'patient' ? patientNav : [];

  const isActive = (to) => loc.pathname === to;

  return (
    <div className="min-h-screen flex bg-slate-100/70 text-slate-800 font-sans">
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-red-600/30">
                <Droplet className="w-5 h-5 fill-white text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight">
                  Blood<span className="text-red-500">Connect</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider -mt-1">
                  Portal
                </span>
              </div>
            </Link>
            <button
              type="button"
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Summary Card */}
          <div className="p-4 mx-3 mt-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
              {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.fullName || 'User'}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-red-600/80 text-white">
                  {user?.role}
                </span>
                {user?.bloodGroup && (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-700 text-rose-300">
                    {user.bloodGroup}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1.5 mt-3">
            <div className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Navigation Menu
            </div>
            {nav.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive(to)
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/20 font-bold'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive(to) ? 'text-white' : 'text-slate-400'}`} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <span>Public Website</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={signOutUser}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-950/50 hover:text-rose-300 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900">
                {user?.role === 'donor' ? 'Donor Portal' : 'Patient Portal'}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Welcome back, {user?.fullName || 'User'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={user?.role === 'donor' ? '/dashboard/notifications' : '/dashboard/requests'}
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5" />
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Live System</span>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

