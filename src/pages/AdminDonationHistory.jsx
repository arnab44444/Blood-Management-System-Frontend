import { useState, useEffect } from 'react';
import { adminApi } from '../api';

export default function AdminDonationHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.donationHistory().then(({ data }) => setHistory(data)).catch(() => setHistory([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <span className="loading loading-spinner loading-lg text-error" />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Donation History</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Date</th>
              <th>Donor</th>
              <th>Patient</th>
              <th>Blood</th>
              <th>Hospital</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr key={h._id}>
                <td>{h.completedAt ? new Date(h.completedAt).toLocaleDateString() : '—'}</td>
                <td>{h.donorName}</td>
                <td>{h.patientName}</td>
                <td><span className="badge badge-error">{h.bloodGroup}</span></td>
                <td>{h.hospitalName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {history.length === 0 && <p className="text-base-content/70">No donation history yet. Mark requests as &quot;donated&quot; from the request detail.</p>}
    </div>
  );
}
