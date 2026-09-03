import { useState, useEffect } from 'react';
import { adminApi } from '../api';
import { 
  History, 
  Calendar, 
  User, 
  Building, 
  Droplet, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Info
} from 'lucide-react';

export default function AdminDonationHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    adminApi.donationHistory()
      .then(({ data }) => setHistory(data))
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredHistory = history.filter((h) => {
    const search = searchTerm.toLowerCase();
    return (
      (h.donorName || '').toLowerCase().includes(search) ||
      (h.patientName || '').toLowerCase().includes(search) ||
      (h.hospitalName || '').toLowerCase().includes(search) ||
      (h.bloodGroup || '').toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-lg text-rose-600"></span>
          <p className="text-sm font-medium text-slate-500">Loading audit history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <History className="w-7 h-7 text-rose-600" />
            Completed Donation Audit Log
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Official immutable record of all fulfilled blood donations across the network.
          </p>
        </div>
      </div>

      {/* Summary Stat */}
      <div className="bg-gradient-to-r from-rose-600 to-red-600 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-3xl font-extrabold">{history.length}</div>
            <div className="text-xs text-rose-100 font-medium">Total Verified Lives Saved</div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-white/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search log entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40"
          />
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Completion Date</th>
                <th className="py-3.5 px-4">Donor Hero</th>
                <th className="py-3.5 px-4">Recipient Patient</th>
                <th className="py-3.5 px-4">Blood Group</th>
                <th className="py-3.5 px-4 sm:px-6">Hospital Facility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <History className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    No donation records found. Once requests are fulfilled and marked &quot;donated&quot;, they appear here.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((h) => (
                  <tr key={h._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-2 text-slate-700 text-xs font-medium">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>{h.completedAt ? new Date(h.completedAt).toLocaleDateString('en-US', { dateStyle: 'medium' }) : '—'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                          {h.donorName ? h.donorName.charAt(0).toUpperCase() : 'D'}
                        </div>
                        <span className="font-semibold text-slate-900 text-sm">{h.donorName || 'Verified Donor'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                          {h.patientName ? h.patientName.charAt(0).toUpperCase() : 'P'}
                        </div>
                        <span className="font-medium text-slate-800 text-sm">{h.patientName || 'Patient'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-bold text-xs bg-rose-50 text-rose-700 border border-rose-200/60 px-2.5 py-1 rounded-lg">
                        <Droplet className="w-3.5 h-3.5 text-rose-500" />
                        {h.bloodGroup}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
                        <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{h.hospitalName || '—'}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
