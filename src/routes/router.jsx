import { createBrowserRouter } from 'react-router';
import HomeLayout from '../layouts/HomeLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';
import PrivateRoute from '../provider/PrivateRoute';
import Home from '../pages/Home';
import Awareness from '../pages/Awareness';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DonorProfile from '../pages/DonorProfile';
import DonorAvailability from '../pages/DonorAvailability';
import DonorNotifications from '../pages/DonorNotifications';
import DonorUpcomingBooking from '../pages/DonorUpcomingBooking';
import DonorDonationHistory from '../pages/DonorDonationHistory';
import RequestBlood from '../pages/RequestBlood';
import MyRequests from '../pages/MyRequests';
import SearchDonors from '../pages/SearchDonors';
import RequestDetail from '../pages/RequestDetail';
import DashboardHome from '../pages/DashboardHome';
import AdminDashboard from '../pages/AdminDashboard';
import AdminDonors from '../pages/AdminDonors';
import AdminRequests from '../pages/AdminRequests';
import AdminDonationHistory from '../pages/AdminDonationHistory';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'awareness', element: <Awareness /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute roles={['donor', 'patient']}>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'profile', element: <DonorProfile /> },
      { path: 'availability', element: <DonorAvailability /> },
      { path: 'upcoming-booking', element: <DonorUpcomingBooking /> },
      { path: 'notifications', element: <DonorNotifications /> },
      { path: 'donation-history', element: <DonorDonationHistory /> },
      { path: 'request-blood', element: <RequestBlood /> },
      { path: 'requests', element: <MyRequests /> },
      { path: 'search-donors', element: <SearchDonors /> },
      { path: 'request/:id', element: <RequestDetail /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute roles={['admin']}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'donors', element: <AdminDonors /> },
      { path: 'requests', element: <AdminRequests /> },
      { path: 'donation-history', element: <AdminDonationHistory /> },
      { path: 'request/:id', element: <RequestDetail /> },
    ],
  },
  { path: '*', element: <ErrorPage /> },
]);

export default router;
