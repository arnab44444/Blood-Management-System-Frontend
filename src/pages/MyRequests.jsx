import { useState, useEffect } from 'react';
import { bloodRequestsApi } from '../api';
import { Link } from 'react-router';

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bloodRequestsApi.list().then(({ data }) => setRequests(data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <span className="loading loading-spinner loading-lg text-error" />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Blood Requests</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Blood</th>
              <th>Hospital</th>
              <th>Level</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id}>
                <td>{r.patientName}</td>
                <td><span className="badge badge-error">{r.bloodGroup}</span></td>
                <td>{r.hospitalName}</td>
                <td>{r.emergencyLevel}</td>
                <td>{r.status}</td>
                <td><Link to={`/dashboard/request/${r._id}`} className="btn btn-ghost btn-sm">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {requests.length === 0 && <p className="text-base-content/70">No requests yet. <Link to="/dashboard/request-blood" className="link">Request blood</Link></p>}
    </div>
  );
}
