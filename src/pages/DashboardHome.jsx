import { useAuth } from '../provider/authContext.js';
import { Link } from 'react-router';
import {
  Heart,
  Calendar,
  Bell,
  Search,
  PlusCircle,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Droplet,
  User,
  Activity,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function DashboardHome() {
  const { user } = useAuth();

  if (user?.role === 'donor') {
    return (
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-6 sm:p-8 shadow-xl shadow-red-600/20 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Voluntary Hero
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome back, {user?.fullName || 'Donor'}!
            </h2>
            <p className="text-sm text-white/90 leading-relaxed">
              Thank you for being part of our life-saving community. Keep your availability updated to receive emergency blood requests.
            </p>
          </div>
          <div className="absolute right-6 bottom-4 opacity-10 hidden sm:block">
            <Droplet className="w-44 h-44 fill-white" />
          </div>
        </div>

        {/* Quick Stats & Readiness Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Profile Status */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Blood Group
              </span>
              <div className="text-2xl font-black text-red-600">
                {user?.bloodGroup || 'Not Set'}
              </div>
              <p className="text-xs text-slate-500">
                {user?.isAvailable !== false ? '✅ Active on donor list' : '⏸️ Currently unavailable'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black text-lg">
              <Droplet className="w-6 h-6 fill-red-600 text-red-600" />
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Account Status
              </span>
              <div className="text-xl font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Verified Donor</span>
              </div>
              <p className="text-xs text-emerald-600 font-semibold">Eligible to receive requests</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* Availability Action */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Availability Mode
              </span>
              <div className="text-base font-bold text-slate-800">
                {user?.emergencyAvailable ? '🚨 Emergency Ready' : 'Standard Routine'}
              </div>
              <p className="text-xs text-slate-500">Manage calendar & timings</p>
            </div>
            <Link
              to="/dashboard/availability"
              className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 transition"
              title="Update Availability"
            >
              <Calendar className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/dashboard/profile"
              className="group p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-red-50 group-hover:text-red-600 flex items-center justify-center shrink-0 transition">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-red-600 transition flex items-center justify-between">
                  My Profile <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Update blood group, location, contact, and bio.
                </p>
              </div>
            </Link>

            <Link
              to="/dashboard/notifications"
              className="group p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-red-50 group-hover:text-red-600 flex items-center justify-center shrink-0 transition">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-red-600 transition flex items-center justify-between">
                  Blood Requests <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  View patients needing your blood type.
                </p>
              </div>
            </Link>

            <Link
              to="/dashboard/donation-history"
              className="group p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-red-50 group-hover:text-red-600 flex items-center justify-center shrink-0 transition">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-red-600 transition flex items-center justify-between">
                  Donation History <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Track completed donations and dates.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (user?.role === 'patient') {
    return (
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-6 sm:p-8 shadow-xl shadow-red-600/20 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <Activity className="w-3.5 h-3.5 text-amber-300" /> Patient Support Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Hello, {user?.fullName || 'Requester'}
            </h2>
            <p className="text-sm text-white/90 leading-relaxed">
              Find voluntary blood donors instantly or submit a verified request to our network.
            </p>
          </div>
          <div className="absolute right-6 bottom-4 opacity-10 hidden sm:block">
            <Activity className="w-44 h-44" />
          </div>
        </div>

        {/* Primary Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/dashboard/request-blood"
            className="group rounded-3xl bg-gradient-to-br from-red-600 to-rose-600 text-white p-6 shadow-lg shadow-red-600/25 hover:scale-[1.02] transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <PlusCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Request Blood</h3>
              <p className="text-xs text-white/80 mt-1">
                Post an emergency or routine request with hospital details.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-rose-200 group-hover:translate-x-1 transition-transform">
              <span>Create Request</span> <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to="/dashboard/search-donors"
            className="group rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Search className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Search Donors</h3>
              <p className="text-xs text-slate-500 mt-1">
                Filter voluntary donors by blood group, district, and availability.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-red-600 group-hover:translate-x-1 transition-transform">
              <span>Search Database</span> <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to="/dashboard/requests"
            className="group rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <FileText className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">My Requests</h3>
              <p className="text-xs text-slate-500 mt-1">
                Track status, matched donors, and donation completions.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-red-600 group-hover:translate-x-1 transition-transform">
              <span>View Active Cases</span> <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return null;
}

