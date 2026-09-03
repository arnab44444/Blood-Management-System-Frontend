import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { bloodRequestsApi, requestContactsApi, donorsApi } from '../api';
import {
  Bell,
  Droplet,
  Building2,
  Calendar,
  Clock,
  HeartHandshake,
  AlertTriangle,
  Info,
  Loader2,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function DonorNotifications() {
  const [requests, setRequests] = useState([]);
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [respondingId, setRespondingId] = useState(null);

  useEffect(() => {
    donorsApi.getProfile().then(({ data }) => setProfile(data)).catch(() => setProfile(null));
  }, []);

  useEffect(() => {
    donorsApi.myBookings().then(({ data }) => setBookings(data || [])).catch(() => setBookings([]));
  }, []);

  useEffect(() => {
    if (!profile?.bloodGroup) return;
    bloodRequestsApi
      .list({ status: 'pending' })
      .then(({ data }) => {
        const matching = data.filter((r) => r.bloodGroup === profile.bloodGroup);
        setRequests(matching);
      })
      .finally(() => setLoading(false));
  }, [profile?.bloodGroup]);

  const acceptRequest = async (requestId) => {
    setRespondingId(requestId);
    try {
      await requestContactsApi.accept(requestId);
      alert('Thank you! Your response was sent. Admin will verify and unlock direct contact with the patient.');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit response.');
    } finally {
      setRespondingId(null);
    }
  };

  const inCooldown = profile && profile.canDonate === false;
  const nextDate = profile?.nextEligibleDate
    ? new Date(profile.nextEligibleDate).toLocaleDateString()
    : null;
  const isBooked = bookings.length > 0;

  if (loading) {
    return (
      <div className="py-16 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto" />
        <p className="text-xs text-slate-500 mt-2 font-semibold">Checking matching blood requests...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Blood Requests for {profile?.bloodGroup || 'Your Group'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Patients in nearby hospitals who urgently need your matching blood type
        </p>
      </div>

      {inCooldown && (
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Cooldown Period:</strong> You cannot accept new requests until 90 days after your previous donation.
            {nextDate && <span className="block mt-0.5 font-bold">Next eligible date: {nextDate}</span>}
          </div>
        </div>
      )}

      {isBooked && (
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200 flex items-start gap-3 text-xs sm:text-sm text-blue-900">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong>Active Booking:</strong> You are currently scheduled for a blood donation. Please fulfill your active commitment first.
            <Link to="/dashboard/upcoming-booking" className="block text-blue-700 font-bold underline mt-1">
              View Active Booking Details →
            </Link>
          </div>
        </div>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((r) => (
          <div
            key={r._id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-red-200 transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-sm">
                  {r.bloodGroup}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{r.patientName}</h3>
                  <span
                    className={`inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      r.emergencyLevel === 'urgent'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {r.emergencyLevel}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-md shadow-red-600/20 transition flex items-center justify-center gap-2 disabled:opacity-50 self-start sm:self-auto"
                onClick={() => acceptRequest(r._id)}
                disabled={inCooldown || isBooked || respondingId === r._id}
                title={
                  isBooked
                    ? 'You are already committed to a request'
                    : inCooldown
                    ? `You can donate again from ${nextDate}`
                    : ''
                }
              >
                {respondingId === r._id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <HeartHandshake className="w-4 h-4" />
                )}
                <span>I Can Donate</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  <strong>{r.hospitalName}</strong>, {r.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  Required:{' '}
                  <strong>{r.requiredDate ? new Date(r.requiredDate).toLocaleDateString() : 'Immediate'}</strong>{' '}
                  {r.requiredTime && `(${r.requiredTime})`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {requests.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Bell className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Pending Requests</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            There are currently no active blood requests matching your blood group ({profile?.bloodGroup || '—'}).
          </p>
        </div>
      )}
    </div>
  );
}

