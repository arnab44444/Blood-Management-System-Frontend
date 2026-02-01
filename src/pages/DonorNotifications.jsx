import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { bloodRequestsApi, requestContactsApi, donorsApi } from '../api';

export default function DonorNotifications() {
  const [requests, setRequests] = useState([]);
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    donorsApi.getProfile().then(({ data }) => setProfile(data)).catch(() => setProfile(null));
  }, []);

  useEffect(() => {
    donorsApi.myBookings().then(({ data }) => setBookings(data || [])).catch(() => setBookings([]));
  }, []);

  useEffect(() => {
    if (!profile?.bloodGroup) return;
    bloodRequestsApi.list({ status: 'pending' }).then(({ data }) => {
      const matching = data.filter((r) => r.bloodGroup === profile.bloodGroup);
      setRequests(matching);
    }).finally(() => setLoading(false));
  }, [profile?.bloodGroup]);

  const acceptRequest = async (requestId) => {
    try {
      await requestContactsApi.accept(requestId);
      alert('Response sent. Admin will verify and share contact.');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed');
    }
  };

  const inCooldown = profile && profile.canDonate === false;
  const nextDate = profile?.nextEligibleDate ? new Date(profile.nextEligibleDate).toLocaleDateString() : null;
  const isBooked = bookings.length > 0;

  if (loading) return <span className="loading loading-spinner loading-lg text-error" />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blood Requests (matching your group {profile?.bloodGroup})</h1>
      {inCooldown && (
        <div className="alert alert-warning mb-4">
          You cannot accept new requests until 90 days after your last donation.
          {nextDate && <span className="block mt-1 font-medium">Next eligible: {nextDate}</span>}
        </div>
      )}
      {isBooked && (
        <div className="alert alert-info mb-4">
          You are already committed to a request. You cannot accept another until it is completed. See <Link to="/dashboard/upcoming-booking" className="link font-medium">Upcoming Booking</Link>.
        </div>
      )}
      <div className="space-y-4">
        {requests.map((r) => (
          <div key={r._id} className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{r.patientName} · {r.bloodGroup}</h3>
                  <p>{r.hospitalName}, {r.location}</p>
                  <p className="text-sm">{r.bags} bag(s) · {r.emergencyLevel}</p>
                  <p className="text-sm">
                    <span className="font-medium">Required:</span>{' '}
                    {r.requiredDate ? new Date(r.requiredDate).toLocaleDateString() : '—'} {r.requiredTime || ''}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-error btn-sm"
                  onClick={() => acceptRequest(r._id)}
                  disabled={inCooldown || isBooked}
                  title={isBooked ? 'You are already committed to a request' : inCooldown ? `You can donate again from ${nextDate}` : ''}
                >
                  I can help
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {requests.length === 0 && <p className="text-base-content/70">No matching pending requests.</p>}
    </div>
  );
}
