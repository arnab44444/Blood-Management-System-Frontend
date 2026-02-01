import { useAuth } from '../provider/authContext.js';
import { Link } from 'react-router';

export default function DashboardHome() {
  const { user } = useAuth();

  if (user?.role === 'donor') {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Donor Dashboard</h1>
        <p className="mb-4">Manage your profile and availability. You are on the donor dashboard.</p>
        <div className="flex gap-4">
          <Link to="/dashboard" className="btn btn-error">My Profile</Link>
          <Link to="/dashboard/availability" className="btn btn-outline btn-error">Availability</Link>
          <Link to="/dashboard/notifications" className="btn btn-outline btn-error">Requests</Link>
        </div>
      </div>
    );
  }

  if (user?.role === 'patient') {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>
        <p className="mb-4">Request blood and search donors.</p>
        <div className="flex gap-4">
          <Link to="/dashboard/request-blood" className="btn btn-error">Request Blood</Link>
          <Link to="/dashboard/requests" className="btn btn-outline btn-error">My Requests</Link>
          <Link to="/dashboard/search-donors" className="btn btn-outline btn-error">Search Donors</Link>
        </div>
      </div>
    );
  }

  return null;
}
