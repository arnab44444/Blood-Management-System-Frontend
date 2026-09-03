import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { bloodRequestsApi, requestContactsApi, adminApi } from '../api';
import { useAuth } from '../provider/authContext.js';
import {
  Building2,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Droplet,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Unlock,
  AlertTriangle,
  Loader2,
  User,
  ArrowLeft,
} from 'lucide-react';

export default function RequestDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequest = () => {
    if (!id) return;
    bloodRequestsApi
      .get(id)
      .then(({ data }) => setRequest(data))
      .catch(() => setRequest(null))
      .finally(() => setLoading(false));
  };

  const loadContacts = () => {
    if (!id) return;
    requestContactsApi
      .getByRequest(id)
      .then(({ data }) => setContacts(data))
      .catch(() => setContacts([]));
  };

  useEffect(() => {
    if (!id) return;
    loadRequest();
  }, [id]);

  useEffect(() => {
    if (!id || !request) return;
    loadContacts();
  }, [id, request]);

  if (loading || !request) {
    return (
      <div className="py-16 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto" />
        <p className="text-xs text-slate-500 mt-2 font-semibold">Loading request details...</p>
      </div>
    );
  }

  const isCompleted = request.status === 'completed';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back Link */}
      <div>
        <Link
          to={user?.role === 'admin' ? '/admin/requests' : '/dashboard/requests'}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Requests List
        </Link>
      </div>

      {/* Patient Request Banner Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md shadow-red-600/20">
              {request.bloodGroup}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">{request.patientName}</h1>
                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    request.emergencyLevel === 'urgent'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {request.emergencyLevel}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Required Units: <strong>{request.bags || 1} Bag(s)</strong> · Request ID: {request._id?.slice(-6)}
              </p>
            </div>
          </div>

          <span
            className={`text-xs font-black uppercase px-3 py-1.5 rounded-xl border self-start ${
              isCompleted
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : request.status === 'approved'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            Status: {request.status || 'pending'}
          </span>
        </div>

        {/* Hospital & Time Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
          <div className="flex items-start gap-3 text-slate-700">
            <Building2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">{request.hospitalName}</span>
              <span className="text-xs text-slate-500">{request.location}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-slate-700">
            <Calendar className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">
                {request.requiredDate ? new Date(request.requiredDate).toLocaleDateString() : 'Date Not Specified'}
              </span>
              <span className="text-xs text-slate-500">{request.requiredTime || 'Anytime'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Unlock Action Box */}
      {user?.role === 'admin' && request?.status === 'approved' && contacts.some((c) => !c.adminApproved) && (
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-amber-900">
            <Lock className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              <strong>Admin Control:</strong> Some donor contacts are pending verification. Unlock them so the patient can call directly.
            </span>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5"
            onClick={async () => {
              await adminApi.unlockContacts(id);
              loadContacts();
            }}
          >
            <Unlock className="w-3.5 h-3.5" /> Unlock All Contacts
          </button>
        </div>
      )}

      {/* Responded Donors List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Droplet className="w-5 h-5 text-red-600" /> Responded Voluntary Donors ({contacts.length})
          </h2>
        </div>

        {contacts.length > 0 ? (
          <div className="space-y-3">
            {contacts.map((c) => (
              <div
                key={c._id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{c.donor?.fullName}</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-red-100 text-red-700">
                      {c.donor?.bloodGroup}
                    </span>
                    {c.donor?.verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    {[c.donor?.district, c.donor?.area].filter(Boolean).join(', ') || 'District not provided'}
                  </p>
                  {c.adminApproved && c.donor?.mobile ? (
                    <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 pt-1">
                      <Phone className="w-3.5 h-3.5" /> Direct Contact: {c.donor.mobile}
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-400 italic pt-0.5">
                      🔒 Phone number locked until admin verification
                    </p>
                  )}
                </div>

                {/* Admin controls per donor */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {!c.adminApproved && user?.role === 'admin' && (
                    <button
                      type="button"
                      className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition"
                      onClick={async () => {
                        await requestContactsApi.approve(c._id);
                        loadContacts();
                      }}
                    >
                      Approve Contact
                    </button>
                  )}
                  {user?.role === 'admin' && request?.status !== 'completed' && c.donorId && (
                    <button
                      type="button"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-xs"
                      onClick={async () => {
                        try {
                          await adminApi.completeDonation(id, c.donorId?.toString?.() || c.donorId);
                          loadRequest();
                          loadContacts();
                        } catch (e) {
                          alert(e.response?.data?.message || 'Failed');
                        }
                      }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Donated
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              No donors have responded yet. Compatible donors are being alerted.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

