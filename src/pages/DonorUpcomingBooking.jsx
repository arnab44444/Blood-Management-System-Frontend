import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { donorsApi } from '../api';

export default function DonorUpcomingBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    donorsApi.myBookings().then(({ data }) => setBookings(data || [])).catch(() => setBookings([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <span className="loading loading-spinner loading-lg text-error" />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upcoming Booking</h1>
      {bookings.length === 0 ? (
        <p className="text-base-content/70">No upcoming booking. When you accept a request (&quot;I can help&quot;), it will appear here.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.requestId} className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Patient / Blood Requester</h2>
                <p className="font-medium">{b.patientName}</p>
                <p className="text-sm text-base-content/80">Blood: <span className="badge badge-error">{b.bloodGroup}</span> · {b.bags} bag(s)</p>
                <p className="text-sm"><span className="font-medium">Contact:</span> {b.contactNumber}</p>
                <p className="text-sm"><span className="font-medium">Hospital:</span> {b.hospitalName}, {b.location}</p>
                <p className="text-sm">
                  <span className="font-medium">Required:</span>{' '}
                  {b.requiredDate ? new Date(b.requiredDate).toLocaleDateString() : '—'} {b.requiredTime || ''}
                </p>
                <p className="text-sm">Level: {b.emergencyLevel} · Status: {b.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
