import { Outlet, Link, useLocation } from 'react-router';
import { useAuth } from '../provider/authContext.js';

const nav = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/donors', label: 'Donors' },
  { to: '/admin/requests', label: 'Requests' },
  { to: '/admin/donation-history', label: 'Donation History' },
];

export default function AdminLayout() {
  const loc = useLocation();
  const { signOutUser } = useAuth();

  return (
    <div className="min-h-screen flex bg-base-200">
      <aside className="w-56 bg-base-100 shadow flex flex-col">
        <div className="p-4 border-b">
          <Link to="/" className="font-bold text-error">BloodConnect Admin</Link>
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
