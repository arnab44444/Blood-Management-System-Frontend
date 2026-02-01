import { Outlet, Link, useLocation } from 'react-router';
import { useAuth } from '../provider/authContext.js';

export default function DashboardLayout() {
  const { user, signOutUser } = useAuth();
  const loc = useLocation();

  const donorNav = [
    { to: '/dashboard', label: 'Home' },
    { to: '/dashboard/profile', label: 'My Profile' },
    { to: '/dashboard/availability', label: 'Availability' },
    { to: '/dashboard/upcoming-booking', label: 'Upcoming Booking' },
    { to: '/dashboard/notifications', label: 'Requests' },
    { to: '/dashboard/donation-history', label: 'Donation History' },
  ];

  const patientNav = [
    { to: '/dashboard/requests', label: 'My Requests' },
    { to: '/dashboard/request-blood', label: 'Request Blood' },
    { to: '/dashboard/search-donors', label: 'Search Donors' },
  ];

  const nav = user?.role === 'donor' ? donorNav : user?.role === 'patient' ? patientNav : [];

  return (
    <div className="min-h-screen flex bg-base-200">
      <aside className="w-56 bg-base-100 shadow flex flex-col">
        <div className="p-4 border-b">
          <Link to="/" className="font-bold text-error">BloodConnect</Link>
        </div>
        <nav className="p-2 flex-1">
          {nav.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`btn btn-ghost btn-block justify-start ${loc.pathname === to ? 'btn-active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-2 border-t border-base-200">
          <button
            type="button"
            onClick={signOutUser}
            className="btn btn-ghost btn-block justify-start text-error hover:bg-error hover:text-error-content"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
