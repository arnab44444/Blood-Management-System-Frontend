import { useState, useEffect } from 'react';
import { donorsApi } from '../api';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function SearchDonors() {
  const [filters, setFilters] = useState({ bloodGroup: '', district: '', available: 'true' });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    try {
      const { data } = await donorsApi.search(filters);
      setDonors(data);
    } catch {
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search Donors</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="select select-bordered"
          value={filters.bloodGroup}
          onChange={(e) => setFilters((f) => ({ ...f, bloodGroup: e.target.value }))}
        >
          <option value="">All blood groups</option>
          {BLOOD_GROUPS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <input
          type="text"
          placeholder="District"
          className="input input-bordered"
          value={filters.district}
          onChange={(e) => setFilters((f) => ({ ...f, district: e.target.value }))}
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={filters.available === 'true'} onChange={(e) => setFilters((f) => ({ ...f, available: e.target.checked ? 'true' : 'false' }))} />
          Available only
        </label>
        <button type="button" className="btn btn-error" onClick={search} disabled={loading}>Search</button>
      </div>
      {loading && <span className="loading loading-spinner text-error" />}
      <div className="grid gap-4 md:grid-cols-2">
        {donors.map((d) => (
          <div key={d._id} className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="card-title text-lg">{d.fullName}</h3>
                <span className="badge badge-error">{d.bloodGroup}</span>
                {(d.donationCount ?? 0) > 0 && <span className="badge badge-ghost badge-sm">{d.donationCount} donation(s)</span>}
                {(d.donationCount ?? 0) >= 3 && <span className="badge badge-warning badge-sm">Life Saver</span>}
                {d.verified && <span className="badge badge-success badge-sm">Verified</span>}
                {d.emergencyAvailable && <span className="badge badge-warning badge-sm">Emergency</span>}
              </div>
              <p className="text-base-content/80">{[d.district, d.area].filter(Boolean).join(', ') || '—'}</p>
              <p className="text-sm text-base-content/70">
                {d.available ? 'Available' : 'Not available'} · {d.canDonate ? 'Eligible to donate' : 'Cooldown (90 days)'}
              </p>
              {d.mobile ? (
                <p className="text-sm font-medium text-success mt-1">Contact: {d.mobile}</p>
              ) : (
                <p className="text-xs text-base-content/60">Contact shared only after admin approves your request.</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {!loading && donors.length === 0 && (
        <p className="text-base-content/70">
          No donors found. Try clearing filters or uncheck &quot;Available only&quot; to see all donors.
        </p>
      )}
    </div>
  );
}
