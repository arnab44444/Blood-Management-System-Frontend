import { useState, useEffect } from 'react';
import { bloodRequestsApi } from '../api';
import { Link } from 'react-router';
import {
  FileText,
  PlusCircle,
  Clock,
  AlertTriangle,
  Building2,
  Droplet,
  ChevronRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bloodRequestsApi
      .list()
      .then(({ data }) => setRequests(data))
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved':
      case 'matched':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto" />
        <p className="text-xs text-slate-500 mt-2 font-semibold">Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Blood Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Monitor real-time status and matched donors for your patients
          </p>
        </div>

        <Link
          to="/dashboard/request-blood"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-md shadow-red-600/20 transition self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> New Blood Request
        </Link>
      </div>

      {/* Requests Table Card */}
      {requests.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[11px] font-extrabold uppercase tracking-wider">
                  <th className="py-4 px-6">Patient Name</th>
                  <th className="py-4 px-6">Blood Group</th>
                  <th className="py-4 px-6">Hospital & Location</th>
                  <th className="py-4 px-6">Urgency</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {requests.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {r.patientName}
                      <span className="block text-xs font-normal text-slate-400 mt-0.5">
                        {r.bags || 1} Bag(s) required
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 text-white font-black text-sm shadow-xs">
                        {r.bloodGroup}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-700">
                      <div className="font-semibold">{r.hospitalName}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{r.location || 'Location not given'}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                          r.emergencyLevel === 'urgent'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {r.emergencyLevel}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${getStatusBadge(
                          r.status
                        )}`}
                      >
                        {r.status || 'pending'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        to={`/dashboard/request/${r._id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">No Blood Requests Yet</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Create your first blood request when you need volunteer donors for a patient.
            </p>
          </div>
          <Link
            to="/dashboard/request-blood"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-sm shadow-md transition"
          >
            <PlusCircle className="w-4 h-4" /> Create Request Now
          </Link>
        </div>
      )}
    </div>
  );
}

