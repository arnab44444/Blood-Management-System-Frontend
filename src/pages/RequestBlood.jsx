import { useState } from 'react';
import { Link } from 'react-router';
import { bloodRequestsApi } from '../api';
import {
  PlusCircle,
  Building2,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Droplet,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Loader2,
  ShieldCheck,
  User,
} from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function RequestBlood() {
  const [form, setForm] = useState({
    patientName: '',
    bloodGroup: '',
    bags: 1,
    hospitalName: '',
    location: '',
    requiredDate: '',
    requiredTime: '',
    emergencyLevel: 'normal',
    contactNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'number' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await bloodRequestsApi.create(form);
      setDone(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-5 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">Blood Request Submitted!</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Your request has been broadcasted to compatible voluntary donors. Admin will verify hospital details and unlock direct donor contacts shortly.
          </p>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard/requests"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-sm shadow-md hover:from-red-500 hover:to-rose-500 transition"
          >
            Track My Requests
          </Link>
          <Link
            to="/dashboard/search-donors"
            className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition"
          >
            Search Live Donors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Request Blood
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Fill in patient & hospital details to immediately notify nearby voluntary donors
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5"
      >
        {/* Emergency Urgency Toggle */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Emergency Level
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, emergencyLevel: 'normal' }))}
              className={`py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                form.emergencyLevel === 'normal'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-4 h-4" /> Standard Routine
            </button>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, emergencyLevel: 'urgent' }))}
              className={`py-3 rounded-2xl text-xs sm:text-sm font-black border transition-all flex items-center justify-center gap-2 ${
                form.emergencyLevel === 'urgent'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-600 shadow-md shadow-red-600/30 ring-2 ring-red-400/50'
                  : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
              }`}
            >
              <AlertTriangle className="w-4 h-4" /> 🚨 Critical / Urgent
            </button>
          </div>
        </div>

        {/* Patient Name & Blood Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Patient Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                name="patientName"
                type="text"
                placeholder="Patient Name"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                value={form.patientName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Required Blood Group
            </label>
            <div className="relative">
              <Droplet className="w-4 h-4 text-red-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                name="bloodGroup"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50 font-bold"
                value={form.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select Group</option>
                {BLOOD_GROUPS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bags & Contact Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Number of Bags
            </label>
            <input
              name="bags"
              type="number"
              min={1}
              max={10}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
              value={form.bags}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Requester Contact Mobile
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                name="contactNumber"
                type="tel"
                placeholder="01XXXXXXXXX"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                value={form.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Hospital & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Hospital Name
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                name="hospitalName"
                type="text"
                placeholder="e.g. Dhaka Medical College"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                value={form.hospitalName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Hospital Location / Area
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                name="location"
                type="text"
                placeholder="e.g. Shahbag, Dhaka"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Required Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Required Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                name="requiredDate"
                type="date"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                value={form.requiredDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Required Time
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                name="requiredTime"
                type="time"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                value={form.requiredTime}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Broadcast Requesting...
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" /> Publish Blood Request
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

