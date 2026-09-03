import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { donorsApi } from '../api';
import {
  CalendarCheck,
  Building2,
  Phone,
  Droplet,
  Calendar,
  Clock,
  MapPin,
  AlertTriangle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export default function DonorUpcomingBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    donorsApi
      .myBookings()
      .then(({ data }) => setBookings(data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto" />
        <p className="text-xs text-slate-500 mt-2 font-semibold">Loading upcoming commitments...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Upcoming Donation Commitment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Details of the patient and hospital you are scheduled to donate for
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <CalendarCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">No Active Bookings</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              When you respond to a blood request, your active hospital appointment will appear here.
            </p>
          </div>
          <Link
            to="/dashboard/notifications"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md transition"
          >
            Check Open Requests
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.requestId}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-red-600/20">
                    {b.bloodGroup}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Patient Recipient
                    </span>
                    <h2 className="text-2xl font-black text-slate-900">{b.patientName}</h2>
                    <span className="text-xs text-slate-500 font-medium">
                      Needed: {b.bags} Bag(s) · Urgency: {b.emergencyLevel}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-black uppercase px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl">
                  {b.status || 'Active'}
                </span>
              </div>

              {/* Hospital details & contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      Hospital: <strong>{b.hospitalName}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Location: {b.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      Date:{' '}
                      <strong>
                        {b.requiredDate ? new Date(b.requiredDate).toLocaleDateString() : 'Immediate'}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Time: {b.requiredTime || 'As soon as possible'}</span>
                  </div>
                </div>
              </div>

              {/* Direct call action */}
              {b.contactNumber && (
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex items-center justify-between gap-4">
                  <div className="text-xs text-emerald-900 font-bold flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600" /> Requester Contact: {b.contactNumber}
                  </div>
                  <a
                    href={`tel:${b.contactNumber}`}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shrink-0"
                  >
                    Call Family
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

