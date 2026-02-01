import { Outlet } from 'react-router';
import { Link } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="text-2xl font-bold text-error hover:opacity-80 transition-opacity">BloodConnect</Link>
          <p className="text-sm text-base-content/60 mt-1">Charity-based blood management</p>
        </div>
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body p-6 sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
