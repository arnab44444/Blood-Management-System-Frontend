import { useState } from 'react';
import { Outlet, Link } from 'react-router';
import { useAuth } from '../provider/authContext.js';

export default function HomeLayout() {
  const { user, signOutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <header className="navbar fixed top-0 left-0 right-0 z-40 bg-base-100 shadow-lg px-4 py-2">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl text-error font-bold">
            BloodConnect
          </Link>
        </div>

        <div className="navbar-end items-center">
          <div className="hidden md:flex items-center gap-2 whitespace-nowrap">
            <Link to="/" className="btn btn-ghost btn-sm">Home</Link>
            <Link to="/awareness" className="btn btn-ghost btn-sm">Awareness</Link>
            {!user ? (
              <Link to="/auth/login" className="btn btn-ghost btn-sm">Login</Link>
            ) : (
              <>
                <Link
                  to={
                    user.role === 'donor'
                      ? '/dashboard'
                      : user.role === 'patient'
                      ? '/dashboard/requests'
                      : '/admin'
                  }
                  className="btn btn-ghost btn-sm"
                >
                  Dashboard
                </Link>
                <button type="button" onClick={signOutUser} className="btn btn-ghost btn-sm">
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-sm md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-4 top-full mt-2 w-48 rounded-lg bg-base-100 p-3 shadow-lg ring-1 ring-black/10 md:hidden">
              <div className="flex flex-col gap-2">
                <Link onClick={() => setMenuOpen(false)} to="/" className="btn btn-ghost btn-block justify-start">
                  Home
                </Link>
                <Link onClick={() => setMenuOpen(false)} to="/awareness" className="btn btn-ghost btn-block justify-start">
                  Awareness
                </Link>
                {!user ? (
                  <Link onClick={() => setMenuOpen(false)} to="/auth/login" className="btn btn-ghost btn-block justify-start">
                    Login
                  </Link>
                ) : (
                  <>
                    <Link
                      onClick={() => setMenuOpen(false)}
                      to={
                        user.role === 'donor'
                          ? '/dashboard'
                          : user.role === 'patient'
                          ? '/dashboard/requests'
                          : '/admin'
                      }
                      className="btn btn-ghost btn-block justify-start"
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        signOutUser();
                      }}
                      className="btn btn-ghost btn-block justify-start"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <footer className="footer footer-center p-4 bg-base-100 text-base-content border-t">
        <p>BloodConnect – Charity-based blood management. No money is charged for blood donation.</p>
      </footer>
    </div>
  );
}


