import { useState, useEffect } from 'react';
import { adminApi } from '../api';

export default function AdminDonors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.donors().then(({ data }) => setDonors(data)).finally(() => setLoading(false));
  }, []);

  const verify = async (id) => {
    try {
      await adminApi.verifyDonor(id);
      setDonors((prev) => prev.map((d) => (d._id === id ? { ...d, verified: true } : d)));
    } catch (e) {
      alert(e.response?.data?.message || 'Failed');
    }
  };

  if (loading) return <span className="loading loading-spinner loading-lg text-error" />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Donors (verify to show in search)</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Blood</th>
              <th>District</th>
              <th>Mobile</th>
              <th>Verified</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {donors.map((d) => (
              <tr key={d._id}>
                <td>{d.fullName}</td>
                <td><span className="badge badge-error">{d.bloodGroup}</span></td>
                <td>{d.district}</td>
                <td>{d.mobile}</td>
                <td>{d.verified ? 'Yes' : 'No'}</td>
                <td>{!d.verified && <button type="button" className="btn btn-sm btn-error" onClick={() => verify(d._id)}>Verify</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
