import { useState, useEffect } from 'react';
import { donorsApi } from '../api';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function DonorProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const defaults = {
      fullName: '', bloodGroup: '', age: '', gender: '', mobile: '', email: '',
      district: '', area: '', lastDonationDate: '', healthEligible: false,
    };
    donorsApi.getProfile()
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
      setMessage('Profile saved.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <span className="loading loading-spinner loading-lg text-error" />;

  const nextDate = profile?.nextEligibleDate ? new Date(profile.nextEligibleDate).toLocaleDateString() : null;
  const lifeSaver = (profile?.donationCount ?? 0) >= 3;

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold">Donor Profile</h1>
        {(profile?.donationCount ?? 0) > 0 && (
          <span className="badge badge-success">Donations: {profile.donationCount}</span>
        )}
        {lifeSaver && <span className="badge badge-warning">Life Saver</span>}
      </div>

      <div className="card bg-base-100 shadow-lg border border-base-200">
        <div className="card-body space-y-6">
          {profile?.canDonate === false && (
            <div className="alert alert-warning">
              <div>
                <span className="font-semibold">Donation cooldown:</span> You cannot donate before 90 days from your last donation.
                {nextDate && <span className="block mt-1">Next eligible: {nextDate}</span>}
              </div>
            </div>
          )}

          {message && (
            <div className="alert alert-info">
              <div>{message}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <input
                  name="fullName"
                  className="input input-bordered w-full"
                  value={form.fullName || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Blood Group</span>
                </label>
                <select
                  name="bloodGroup"
                  className="select select-bordered w-full"
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

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Age (18+)</span>
                </label>
                <input
                  name="age"
                  type="number"
                  min={18}
                  className="input input-bordered w-full"
                  value={form.age || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Gender</span>
                </label>
                <select
                  name="gender"
                  className="select select-bordered w-full"
                  value={form.gender || ''}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold">Contact</span>
                </label>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    name="mobile"
                    type="tel"
                    placeholder="Mobile"
                    className="input input-bordered w-full"
                    value={form.mobile || ''}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    value={form.email || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold">Location</span>
                </label>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    name="district"
                    placeholder="District"
                    className="input input-bordered w-full"
                    value={form.district || ''}
                    onChange={handleChange}
                  />
                  <input
                    name="area"
                    placeholder="Area"
                    className="input input-bordered w-full"
                    value={form.area || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold">Last Donation Date</span>
                </label>
                <input
                  name="lastDonationDate"
                  type="date"
                  className="input input-bordered w-full"
                  value={form.lastDonationDate || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  name="healthEligible"
                  type="checkbox"
                  className="checkbox checkbox-error"
                  checked={form.healthEligible || false}
                  onChange={handleChange}
                />
                <span className="label-text">I confirm I am eligible to donate (health check)</span>
              </label>

              <button type="submit" className="btn btn-error text-white w-full sm:w-auto" disabled={saving}>
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

