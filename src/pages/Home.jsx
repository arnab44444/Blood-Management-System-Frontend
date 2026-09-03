import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { publicApi } from '../api';
import {
  Droplet,
  Heart,
  Search,
  ShieldCheck,
  Clock,
  Users,
  Award,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Activity,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const COMPATIBILITY = [
  { group: 'O-', giveTo: 'Everyone (Universal Donor)', receiveFrom: 'O-' },
  { group: 'O+', giveTo: 'O+, A+, B+, AB+', receiveFrom: 'O+, O-' },
  { group: 'A-', giveTo: 'A-, A+, AB-, AB+', receiveFrom: 'A-, O-' },
  { group: 'A+', giveTo: 'A+, AB+', receiveFrom: 'A+, A-, O+, O-' },
  { group: 'B-', giveTo: 'B-, B+, AB-, AB+', receiveFrom: 'B-, O-' },
  { group: 'B+', giveTo: 'B+, AB+', receiveFrom: 'B+, B-, O+, O-' },
  { group: 'AB-', giveTo: 'AB-, AB+', receiveFrom: 'AB-, A-, B-, O-' },
  { group: 'AB+', giveTo: 'AB+ only', receiveFrom: 'Everyone (Universal Recipient)' },
];

export default function Home() {
  const [stats, setStats] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('O+');

  useEffect(() => {
    publicApi
      .stats()
      .then(({ data }) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  return (
    <div className="w-full bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Background Decorative Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-rose-300 text-xs sm:text-sm font-semibold backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-red-400 animate-ping" />
                Bangladesh&apos;s Trusted Voluntary Blood Network
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
                Give Blood, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
                  Save a Precious Life.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Connect directly with voluntary, verified blood donors in your area within minutes. No middlemen, 100% free, and secured for life-critical emergencies.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
                <Link
                  to="/auth/register"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] transition-all"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  Become a Voluntary Donor
                </Link>
                <Link
                  to="/auth/login"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 backdrop-blur-sm transition-all"
                >
                  <Search className="w-5 h-5 text-rose-400" />
                  Request Blood Now
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-700/60 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-white">100% Free</div>
                  <div className="text-xs text-slate-400">Charity Platform</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-white">Verified</div>
                  <div className="text-xs text-slate-400">Admin Approved</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-white">24/7 Fast</div>
                  <div className="text-xs text-slate-400">Emergency Matching</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Quick Finder Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Search className="w-5 h-5 text-red-500" /> Quick Blood Finder
                  </h2>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
                    Live Donors
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-4">
                  Select the required blood group to check instant donor compatibility:
                </p>

                {/* Blood Group Grid Buttons */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {BLOOD_GROUPS.map((grp) => (
                    <button
                      key={grp}
                      type="button"
                      onClick={() => setSelectedGroup(grp)}
                      className={`py-2.5 rounded-xl font-black text-sm transition-all ${
                        selectedGroup === grp
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/40 scale-105'
                          : 'bg-slate-700/70 text-slate-200 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {grp}
                    </button>
                  ))}
                </div>

                {/* Compatibility Info for selected group */}
                {COMPATIBILITY.find((c) => c.group === selectedGroup) && (
                  <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-700/70 space-y-2.5 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Can Receive Blood From:</span>
                      <span className="text-white font-bold text-sm text-emerald-400">
                        {COMPATIBILITY.find((c) => c.group === selectedGroup)?.receiveFrom}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-slate-400 font-semibold block">Can Give Blood To:</span>
                      <span className="text-white font-bold text-sm text-rose-300">
                        {COMPATIBILITY.find((c) => c.group === selectedGroup)?.giveTo}
                      </span>
                    </div>
                  </div>
                )}

                <Link
                  to="/auth/login"
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm transition-all shadow-md"
                >
                  Search Donors for {selectedGroup} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Impact Stats Section */}
      <section className="-mt-8 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Donors Stat */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">
                {stats?.donorsCount ?? '250+'}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Registered Donors
              </div>
              <div className="text-xs text-emerald-600 font-semibold mt-0.5">Ready to Donate</div>
            </div>
          </div>

          {/* Blood Requests */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">
                {stats?.requestsCount ?? '180+'}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Blood Requests
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Matched & Processed</div>
            </div>
          </div>

          {/* Urgent / Active */}
          <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-lg shadow-amber-500/10 flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-amber-600">
                {stats?.urgentCount ?? '12'}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Urgent Active Cases
              </div>
              <div className="text-xs text-amber-600 font-semibold mt-0.5">Needs Immediate Attention</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Step Visual Sequence */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
            Transparent Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            How BloodConnect Saves Lives
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            A simple, secure, and authenticated 3-step process to connect patients and volunteer donors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md shadow-slate-100 hover:shadow-xl transition-all relative group">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white font-black text-lg flex items-center justify-center mb-6 shadow-md shadow-red-500/30 group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Create a Request</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Patient or family posts a request with blood group, hospital location, and urgency status.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md shadow-slate-100 hover:shadow-xl transition-all relative group">
            <div className="w-12 h-12 rounded-xl bg-rose-600 text-white font-black text-lg flex items-center justify-center mb-6 shadow-md shadow-rose-500/30 group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Match & Verify</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our automated system alerts compatible donors nearby. Admin reviews and securely verifies contact requests.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md shadow-slate-100 hover:shadow-xl transition-all relative group">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center mb-6 shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Donate & Save Life</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Donor arrives at the hospital, performs donation safely, and receives gratitude from the patient family.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Blood Group Compatibility Table */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
              Medical Reference
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">
              Blood Compatibility Matrix
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Check who you can donate to and receive blood from based on scientific ABO & Rh typing.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider font-bold">
                  <th className="py-4 px-6">Blood Type</th>
                  <th className="py-4 px-6">Can Donate To (Give)</th>
                  <th className="py-4 px-6">Can Receive From (Get)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {COMPATIBILITY.map((item, idx) => (
                  <tr
                    key={item.group}
                    className={idx % 2 === 0 ? 'bg-white hover:bg-red-50/50' : 'bg-slate-50/70 hover:bg-red-50/50'}
                  >
                    <td className="py-4 px-6 font-black text-red-600 text-base">{item.group}</td>
                    <td className="py-4 px-6 text-slate-700 font-semibold">{item.giveTo}</td>
                    <td className="py-4 px-6 text-slate-700 font-semibold">{item.receiveFrom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Emergency CTA Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-8 sm:p-12 shadow-2xl shadow-red-600/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <h2 className="text-3xl font-black">Join as a Hero Today</h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Every 2 seconds, someone in our country requires blood. Your single donation of 450ml can save up to 3 individual lives.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              to="/auth/register"
              className="px-8 py-4 bg-white text-red-700 hover:bg-slate-100 font-extrabold text-sm rounded-xl shadow-lg text-center transition"
            >
              Register as Donor
            </Link>
            <Link
              to="/awareness"
              className="px-8 py-4 bg-red-800/60 hover:bg-red-800 text-white font-bold text-sm rounded-xl border border-white/20 text-center transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}