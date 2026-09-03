import { useState, useEffect } from 'react';
import { donorsApi } from '../api';
import {
  User,
  Droplet,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  AlertCircle,
  CheckCircle2,
  Save,
  Loader2,
  Clock,
} from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function DonorProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const defaults = {
      fullName: '',
      bloodGroup: '',
      age: '',
      gender: '',
      mobile: '',
      email: '',
      district: '',
      area: '',
      lastDonationDate: '',
      healthEligible: false,
    };
    donorsApi
      .getProfile()
      .then(({ data }) => {
        setProfile(data);
        setForm({
          fullName: data.fullName ?? '',
          bloodGroup: data.bloodGroup ?? '',
          age: data.age ?? '',
          gender: data.gender ?? '',
          mobile: data.mobile ?? '',
          email: data.email ?? '',
          district: data.district ?? '',
          area: data.area ?? '',
          lastDonationDate: data.lastDonationDate ? data.lastDonationDate.slice(0, 10) : '',
          healthEligible: data.healthEligible ?? false,
        });
      })
      .catch(() => {
        setProfile(null);
        setForm(defaults);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await donorsApi.updateProfile(form);
      const { data } = await donorsApi.getProfile();
      setProfile(data);
      setMessage('Your profile changes have been saved successfully!');
      setIsSuccess(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save changes.');
      setIsSuccess(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto" />
        <p className="text-xs text-slate-500 mt-2 font-semibold">Loading profile details...</p>
      </div>
    );
  }

  const nextDate = profile?.nextEligibleDate
    ? new Date(profile.nextEligibleDate).toLocaleDateString()
    : null;
  const lifeSaver = (profile?.donationCount ?? 0) >= 3;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header with Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Donor Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Keep your health, contact, and blood group details updated
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(profile?.donationCount ?? 0) > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Droplet className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              {profile.donationCount} Donation(s)
            </span>
          )}
          {lifeSaver && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
              <Award className="w-3.5 h-3.5 text-amber-600" /> Life Saver Award
            </span>
          )}
        </div>
      </div>

      {/* Cooldown Alert Banner */}
      {profile?.canDonate === false && (
        <div className="bg-amber-50 rounded-3xl p-5 border border-amber-200 flex items-start gap-3.5">
          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900">
            <span className="font-bold block">Donation Cooldown Active:</span>
            According to health safety protocols, donors must rest for 90 days after each donation.
            {nextDate && (
              <span className="font-bold text-amber-950 block mt-1">
                Your Next Eligible Donation Date: {nextDate}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Feedback Message Banner */}
      {message && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in fade-in ${
            isSuccess
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {isSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
          <span>{message}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                name="fullName"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                value={form.fullName || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Blood Group, Age, Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                value={form.bloodGroup || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {BLOOD_GROUPS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Age (18+)
              </label>
              <input
                name="age"
                type="number"
                min={18}
                max={70}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                value={form.age || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Gender
              </label>
              <select
                name="gender"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                value={form.gender || ''}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Contact Mobile & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  name="mobile"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                  value={form.mobile || ''}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  name="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                  value={form.email || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* District & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                District
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  name="district"
                  placeholder="e.g. Dhaka"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                  value={form.district || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Area / Upazila
              </label>
              <input
                name="area"
                placeholder="e.g. Dhanmondi, Mirpur"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                value={form.area || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Last Donation Date */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Last Donation Date (if any)
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                name="lastDonationDate"
                type="date"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                value={form.lastDonationDate || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Health Eligibility Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition">
              <input
                name="healthEligible"
                type="checkbox"
                className="checkbox checkbox-error checkbox-sm rounded-md mt-0.5"
                checked={form.healthEligible || false}
                onChange={handleChange}
              />
              <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                I solemnly declare that I do not suffer from severe chronic illness, blood disorders, or recent viral infections and agree to volunteer freely without financial reward.
              </span>
            </label>
          </div>

          {/* Save Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-md shadow-red-600/20 transition flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Profile Details
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


