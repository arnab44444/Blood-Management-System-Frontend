import { useState, useEffect } from 'react';
import { bloodRequestsApi } from '../api';
import { adminApi } from '../api';
import { Link } from 'react-router';

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bloodRequestsApi.list().then(({ data }) => setRequests(data)).finally(() => setLoading(false));
  }, []);

  const setStatus = async (id, status) => {
    try {
      await adminApi.setRequestStatus(id, status);
      setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
    } catch (e) {
      alert(e.response?.data?.message || 'Failed');
    }
  };

  if (loading) return <span className="loading loading-spinner loading-lg text-error" />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blood Requests</h1>
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
                <td className="flex gap-2">
                  {r.status === 'pending' && (
                    <>
                      <button type="button" className="btn btn-sm btn-success" onClick={() => setStatus(r._id, 'approved')}>Approve</button>
                      <button type="button" className="btn btn-sm btn-ghost" onClick={() => setStatus(r._id, 'rejected')}>Reject</button>
                    </>
                  )}
                  <Link to={`/admin/request/${r._id}`} className="btn btn-ghost btn-sm">Contacts</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
