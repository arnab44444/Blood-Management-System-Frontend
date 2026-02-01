import { useState, useEffect } from 'react';
import { adminApi } from '../api';
import { Link } from 'react-router';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.dashboard().then(({ data }) => setStats(data)).catch(() => setStats(null)).finally(() => setLoading(false));
  }, []);

  if (loading) return <span className="loading loading-spinner loading-lg text-error" />;
  if (!stats) return <p>Failed to load dashboard.</p>;

  const cards = [
    { label: 'Total Donors', value: stats.donorsTotal, link: '/admin/donors' },
    { label: 'Verified Donors', value: stats.donorsVerified },
    { label: 'Total Requests', value: stats.requestsTotal },
    { label: 'Urgent Requests', value: stats.requestsUrgent },
    { label: 'Successful Contacts', value: stats.successfulContacts },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="text-base-content/70">{c.label}</h3>
              <p className="text-2xl font-bold">{c.value}</p>
              {c.link && <Link to={c.link} className="link link-error">View</Link>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
