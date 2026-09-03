import { useState, useEffect } from 'react';
import { adminApi } from '../api';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Droplet,
  AlertCircle
} from 'lucide-react';

export default function AdminDonors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBlood, setFilterBlood] = useState('ALL');
  const [filterVerified, setFilterVerified] = useState('ALL');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    adminApi.donors()
      .then(({ data }) => setDonors(data))
      .finally(() => setLoading(false));
  }, []);

  const verify = async (id) => {
    setActionLoading(id);
    try {
      await adminApi.verifyDonor(id);
      setDonors((prev) => prev.map((d) => (d._id === id ? { ...d, verified: true } : d)));
    } catch (e) {
      alert(e.response?.data?.message || 'Verification failed');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredDonors = donors.filter(d => {
    const matchesSearch = 
      (d.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.district || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.mobile || '').includes(searchTerm);
    const matchesBlood = filterBlood === 'ALL' || d.bloodGroup === filterBlood;
    const matchesVerified = 
      filterVerified === 'ALL' || 
      (filterVerified === 'VERIFIED' && d.verified) || 
      (filterVerified === 'PENDING' && !d.verified);

    return matchesSearch && matchesBlood && matchesVerified;
  });

  const totalVerified = donors.filter(d => d.verified).length;
  const totalPending = donors.length - totalVerified;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-lg text-rose-600"></span>
          <p className="text-sm font-medium text-slate-500">Loading donor directory...</p>
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
            <Users className="w-7 h-7 text-rose-600" />
            Donor Verification & Registry
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review, verify, and manage registered blood donors across all regions.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{donors.length}</div>
            <div className="text-xs font-semibold text-slate-500">Total Registered</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-emerald-600">{totalVerified}</div>
            <div className="text-xs font-semibold text-slate-500">Verified & Active</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-amber-600">{totalPending}</div>
            <div className="text-xs font-semibold text-slate-500">Pending Review</div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, district, or mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>

          <div className="relative">
            <Droplet className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={filterBlood}
              onChange={(e) => setFilterBlood(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-700"
            >
              <option value="ALL">All Blood Groups</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={filterVerified}
              onChange={(e) => setFilterVerified(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-700"
            >
              <option value="ALL">All Statuses</option>
              <option value="VERIFIED">Verified Only</option>
              <option value="PENDING">Pending Verification</option>
            </select>
          </div>
        </div>
      </div>

      {/* Donors Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Donor Info</th>
                <th className="py-3.5 px-4">Blood Group</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredDonors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    No donors matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredDonors.map((d) => (
                  <tr key={d._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                          {d.fullName ? d.fullName.charAt(0).toUpperCase() : 'D'}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{d.fullName || 'Anonymous'}</div>
                          <div className="text-xs text-slate-400">{d.email || 'No email'}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-bold text-xs bg-rose-50 text-rose-700 border border-rose-200/60 px-2.5 py-1 rounded-lg">
                        <Droplet className="w-3.5 h-3.5 text-rose-500" />
                        {d.bloodGroup}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{d.district || 'Unspecified'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs font-mono">
                        <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{d.mobile || '—'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {d.verified ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      {!d.verified ? (
                        <button
                          type="button"
                          disabled={actionLoading === d._id}
                          onClick={() => verify(d._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 rounded-xl shadow-sm transition-all active:scale-95 disabled:opacity-50"
                        >
                          {actionLoading === d._id ? (
                            <span className="loading loading-spinner loading-xs" />
                          ) : (
                            <ShieldCheck className="w-3.5 h-3.5" />
                          )}
                          Approve
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-slate-400">Approved</span>
                      )}
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
