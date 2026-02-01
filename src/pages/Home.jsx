import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { publicApi } from '../api';

export default function Home() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    publicApi.stats().then(({ data }) => setStats(data)).catch(() => setStats(null));
  }, []);

  return (
    <div className="min-h-[70vh]">
      <div className="hero bg-base-100 py-12">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-error">BloodConnect</h1>
            <p className="py-4 text-lg opacity-80">
              A charity-based blood management system. Find donors quickly in emergencies.
            </p>
            <p className="text-sm text-base-content/70 mb-6">
              No money is charged for blood donation. Donors and patients use the platform for free.
            </p>
            {stats && (
              <div className="flex flex-wrap gap-6 justify-center mb-8">
                <div className="stat bg-base-200 rounded-lg shadow">
                  <div className="stat-title">Donors</div>
                  <div className="stat-value text-error">{stats.donorsCount ?? 0}</div>
                </div>
                <div className="stat bg-base-200 rounded-lg shadow">
                  <div className="stat-title">Blood Requests</div>
                  <div className="stat-value text-error">{stats.requestsCount ?? 0}</div>
                </div>
                <div className="stat bg-base-200 rounded-lg shadow">
                  <div className="stat-title">Urgent (pending)</div>
                  <div className="stat-value text-warning">{stats.urgentCount ?? 0}</div>
                </div>
              </div>
            )}
            {/* <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/auth/register" className="btn btn-error text-white">Register as Donor</Link>
              <Link to="/auth/register" className="btn btn-outline btn-error">Request Blood</Link>
              <Link to="/awareness" className="btn btn-ghost">Awareness</Link>
              <Link to="/auth/login" className="btn btn-ghost">Login</Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
