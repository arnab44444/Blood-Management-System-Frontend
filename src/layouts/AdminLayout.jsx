import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { useAuth } from '../provider/authContext.js';
import {
  ShieldAlert,
  LayoutDashboard,
  Users,
  GitPullRequest,
  History,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Droplet,
} from 'lucide-react';

const nav = [
  { to: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
  { to: '/admin/donors', label: 'Manage Donors', icon: Users },
  { to: '/admin/requests', label: 'Blood Requests', icon: GitPullRequest },
  { to: '/admin/donation-history', label: 'Donation History', icon: History },
];

export default function AdminLayout() {
  const loc = useLocation();
  const { user, signOutUser } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to) => loc.pathname === to;

  return (
    <div className="min-h-screen flex bg-slate-100/70 text-slate-800 font-sans">
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white tracking-tight">
                  Blood<span className="text-red-500">Connect</span>
                </span>
                <span className="text-[10px] text-amber-400 font-black tracking-widest uppercase -mt-1">
                  Master Admin
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

          {/* Admin User Chip */}
          <div className="p-3.5 mx-3 mt-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 font-black text-sm flex items-center justify-center shrink-0 border border-red-500/30">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.email || 'Administrator'}</p>
              <span className="inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-red-600 text-white mt-0.5">
                Super Admin
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1.5 mt-3">
            <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
              Control Panel
            </div>
            {nav.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive(to)
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30 font-bold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
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
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-white transition"
          >
            <span>View Public Site</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={signOutUser}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Admin Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Administration Central
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Verify donors, unlock emergency contacts, and monitor donation logs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl">
              Admin Access Active
            </span>
          </div>
        </header>

        {/* Main Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

