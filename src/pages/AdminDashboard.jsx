import { useState, useEffect } from 'react';
import { adminApi } from '../api';
import { Link } from 'react-router';
import {
  Users,
  ShieldCheck,
  GitPullRequest,
  AlertTriangle,
  HeartHandshake,
  ArrowRight,
  Loader2,
  Activity,
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .dashboard()
      .then(({ data }) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto" />
        <p className="text-xs text-slate-500 mt-2 font-semibold">Loading admin statistics...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-rose-50 text-rose-800 p-6 rounded-3xl border border-rose-200 text-center text-sm font-semibold">
        Failed to load admin metrics. Please refresh the page.
      </div>
    );
  }

  const cards = [
    {
      label: 'Registered Donors',
      value: stats.donorsTotal,
      sub: 'All registered voluntary donors',
      icon: Users,
      color: 'from-blue-600 to-indigo-600',
      link: '/admin/donors',
      linkText: 'Manage Donors',
    },
    {
      label: 'Verified Donors',
      value: stats.donorsVerified,
      sub: 'Approved to show in public search',
      icon: ShieldCheck,
      color: 'from-emerald-600 to-teal-600',
      link: '/admin/donors',
      linkText: 'Review Verification',
    },
    {
      label: 'Total Blood Requests',
      value: stats.requestsTotal,
      sub: 'All posted patient requirements',
      icon: GitPullRequest,
      color: 'from-rose-600 to-red-600',
      link: '/admin/requests',
      linkText: 'Review Requests',
    },
    {
      label: 'Urgent Cases',
      value: stats.requestsUrgent,
      sub: 'Critical emergency blood requests',
      icon: AlertTriangle,
      color: 'from-amber-500 to-orange-600',
      link: '/admin/requests',
      linkText: 'View Emergencies',
    },
    {
      label: 'Successful Connections',
      value: stats.successfulContacts,
      sub: 'Donors unlocked for patients',
      icon: HeartHandshake,
      color: 'from-purple-600 to-pink-600',
      link: '/admin/donation-history',
      linkText: 'View Logs',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Admin Overview
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          System analytics and live operations monitoring
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    {c.label}
                  </span>
                  <div className="text-3xl font-black text-slate-900 mt-1">{c.value ?? 0}</div>
                  <p className="text-xs text-slate-500 mt-1">{c.sub}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${c.color} text-white flex items-center justify-center shrink-0 shadow-sm`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              {c.link && (
                <div className="pt-3 border-t border-slate-100">
                  <Link
                    to={c.link}
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center justify-between group"
                  >
                    <span>{c.linkText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

