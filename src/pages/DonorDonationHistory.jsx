import { useState, useEffect } from 'react';
import { donorsApi } from '../api';
import {
  History,
  Droplet,
  Building2,
  Calendar,
  Award,
  Loader2,
  CheckCircle2,
  Heart,
} from 'lucide-react';

export default function DonorDonationHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    donorsApi
      .myDonationHistory()
      .then(({ data }) => setHistory(data || []))
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto" />
        <p className="text-xs text-slate-500 mt-2 font-semibold">Loading donation history...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Donation History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Lifetime verified blood donations recorded on BloodConnect
          </p>
        </div>

        {history.length > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 self-start sm:self-auto">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Total Completed: {history.length} Session(s)</span>
          </div>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Donations Recorded Yet</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Once you fulfill a donation and the admin logs it as completed, it will appear here as a milestone.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[11px] font-extrabold uppercase tracking-wider">
                  <th className="py-4 px-6">Completed Date</th>
                  <th className="py-4 px-6">Patient Name</th>
                  <th className="py-4 px-6">Blood Type</th>
                  <th className="py-4 px-6">Hospital</th>
                  <th className="py-4 px-6 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {history.map((h) => (
                  <tr key={h._id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>
                          {h.completedAt ? new Date(h.completedAt).toLocaleDateString() : '—'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-800">{h.patientName}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-red-50 text-red-700 font-black text-xs border border-red-100">
                        {h.bloodGroup}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{h.hospitalName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Admin Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

