import React from 'react';
import { useAuth } from './authContext.js';
import { Navigate, useLocation } from 'react-router';

export default function PrivateRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen gap-2">
        <span className="loading loading-infinity loading-lg text-error"></span>
      </div>
    );
  }

  if (!user?.email) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} />;
  }

  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}
