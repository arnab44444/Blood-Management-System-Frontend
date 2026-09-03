import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://blood-donation-nu-steel.vercel.app/api';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bloodconnect_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('bloodconnect_token');
      localStorage.removeItem('bloodconnect_user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(err);
  }
);

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
};

export const donorsApi = {
  getProfile: () => api.get('/donors/profile'),
  updateProfile: (data) => api.put('/donors/profile', data),
  search: (params) => api.get('/donors/search', { params }),
  myBookings: () => api.get('/donors/my-bookings'),
  myDonationHistory: () => api.get('/donors/donation-history'),
};

export const bloodRequestsApi = {
  create: (data) => api.post('/blood-requests', data),
  list: (params) => api.get('/blood-requests', { params }),
  get: (id) => api.get(`/blood-requests/${id}`),
};

export const requestContactsApi = {
  accept: (requestId) => api.post('/request-contacts', { requestId }),
  getByRequest: (requestId) => api.get(`/request-contacts/request/${requestId}`),
  approve: (id) => api.patch(`/request-contacts/${id}/approve`),
};

export const publicApi = {
  stats: () => api.get('/public/stats'),
};

export const adminApi = {
  dashboard: () => api.get('/admin/dashboard'),
  donors: () => api.get('/admin/donors'),
  donationHistory: () => api.get('/admin/donation-history'),
  verifyDonor: (id) => api.patch(`/donors/${id}/verify`),
  setRequestStatus: (id, status) => api.patch(`/blood-requests/${id}/status`, { status }),
  unlockContacts: (requestId) => api.patch(`/blood-requests/${requestId}/unlock-contacts`),
  completeDonation: (requestId, donorId) => api.patch(`/blood-requests/${requestId}/complete`, { donorId }),
  blockUser: (id) => api.patch(`/admin/users/${id}/block`),
};
