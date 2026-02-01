import { Outlet, Link } from 'react-router';
import { useAuth } from '../provider/authContext.js';

export default function HomeLayout() {
  const { user, signOutUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <header className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl text-error font-bold">
            BloodConnect
          </Link>
        </div>
        <nav className="flex gap-2">
          <Link to="/" className="btn btn-ghost btn-sm">Home</Link>
          <Link to="/awareness" className="btn btn-ghost btn-sm">Awareness</Link>
          {!user ? (
            <>
              <Link to="/auth/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/auth/register" className="btn btn-error btn-sm text-white">Register</Link>
            </>
          ) : (
            <>
              <Link to={user.role === 'donor' ? '/dashboard' : user.role === 'patient' ? '/dashboard/requests' : '/admin'} className="btn btn-ghost btn-sm">Dashboard</Link>
              <button type="button" onClick={signOutUser} className="btn btn-ghost btn-sm">Logout</button>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="footer footer-center p-4 bg-base-100 text-base-content border-t">
        <p>BloodConnect – Charity-based blood management. No money is charged for blood donation.</p>
      </footer>
    </div>
  );
}


