import { useState, useEffect } from 'react';
import { bloodRequestsApi, adminApi } from '../api';
import { Link } from 'react-router';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Building, 
  Droplet, 
  User, 
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    bloodRequestsApi.list()
      .then(({ data }) => setRequests(data))
      .finally(() => setLoading(false));
  }, []);

  const setStatus = async (id, status) => {
    setActionLoading(id);
    try {
      await adminApi.setRequestStatus(id, status);
      setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to update status');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      (r.patientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.hospitalName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.bloodGroup || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      activeFilter === 'ALL' ||
      (activeFilter === 'PENDING' && r.status === 'pending') ||
      (activeFilter === 'APPROVED' && r.status === 'approved') ||
      (activeFilter === 'DONATED' && r.status === 'donated') ||
      (activeFilter === 'REJECTED' && r.status === 'rejected');

    return matchesSearch && matchesStatus;
  });

  const countPending = requests.filter(r => r.status === 'pending').length;
  const countApproved = requests.filter(r => r.status === 'approved').length;
  const countCritical = requests.filter(r => r.emergencyLevel === 'critical' || r.emergencyLevel === 'high').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-lg text-rose-600"></span>
          <p className="text-sm font-medium text-slate-500">Loading blood requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
          <FileText className="w-7 h-7 text-rose-600" />
          Blood Requests Moderation
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review, approve, and oversee all emergency blood requests raised by patients.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{requests.length}</div>
            <div className="text-xs font-semibold text-slate-500">Total Requests</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-amber-600">{countPending}</div>
            <div className="text-xs font-semibold text-slate-500">Needs Approval</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-emerald-600">{countApproved}</div>
            <div className="text-xs font-semibold text-slate-500">Active Approved</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-rose-600">{countCritical}</div>
            <div className="text-xs font-semibold text-slate-500">High / Critical Urgency</div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { key: 'ALL', label: 'All Requests' },
            { key: 'PENDING', label: `Pending (${countPending})` },
            { key: 'APPROVED', label: 'Approved' },
            { key: 'DONATED', label: 'Completed' },
            { key: 'REJECTED', label: 'Rejected' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === tab.key
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient, hospital..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          />
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Patient & Blood</th>
                <th className="py-3.5 px-4">Hospital Location</th>
                <th className="py-3.5 px-4">Urgency</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No requests found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((r) => {
                  const isCritical = r.emergencyLevel === 'critical' || r.emergencyLevel === 'high';
                  return (
                    <tr key={r._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl font-extrabold text-sm bg-rose-50 text-rose-600 border border-rose-200/60 flex-shrink-0">
                            {r.bloodGroup}
                          </span>
                          <div>
                            <div className="font-semibold text-slate-900">{r.patientName}</div>
                            <div className="text-xs text-slate-400">
                              {r.requiredDate ? new Date(r.requiredDate).toLocaleDateString() : 'Date unspecified'}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-slate-700 text-xs font-medium">
                          <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span>{r.hospitalName}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                          isCritical
                            ? 'bg-red-50 text-red-700 border border-red-200/60 animate-pulse'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {isCritical && <AlertTriangle className="w-3 h-3 text-red-500" />}
                          {r.emergencyLevel || 'normal'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                          r.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : r.status === 'donated'
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                            : r.status === 'rejected'
                            ? 'bg-red-50 text-red-700 border border-red-200/60'
                            : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                        }`}>
                          {r.status === 'approved' && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                          {r.status === 'pending' && <Clock className="w-3 h-3 text-amber-500" />}
                          {r.status === 'rejected' && <XCircle className="w-3 h-3 text-red-500" />}
                          {r.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {r.status === 'pending' && (
                            <>
                              <button
                                type="button"
                                disabled={actionLoading === r._id}
                                onClick={() => setStatus(r._id, 'approved')}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-all disabled:opacity-50"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                Approve
                              </button>
                              <button
                                type="button"
                                disabled={actionLoading === r._id}
                                onClick={() => setStatus(r._id, 'rejected')}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-all disabled:opacity-50"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                Reject
                              </button>
                            </>
                          )}
                          <Link
                            to={`/admin/request/${r._id}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                          >
                            Details
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
