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
    <div className="max-w-xl">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">Donor Profile</h1>
        {(profile?.donationCount ?? 0) > 0 && (
          <span className="badge badge-success">Donations: {profile.donationCount}</span>
        )}
        {lifeSaver && <span className="badge badge-warning">Life Saver</span>}
      </div>
      {profile?.canDonate === false && (
        <div className="alert alert-warning mb-4">
          You cannot donate before 90 days from your last donation.
          {nextDate && <span className="block mt-1">Next eligible: {nextDate}</span>}
        </div>
      )}
      {message && <div className="alert alert-info mb-4">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label"><span className="label-text">Full Name</span></label>
          <input name="fullName" className="input input-bordered" value={form.fullName || ''} onChange={handleChange} required />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Blood Group</span></label>
          <select name="bloodGroup" className="select select-bordered" value={form.bloodGroup || ''} onChange={handleChange} required>
            <option value="">Select</option>
            {BLOOD_GROUPS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Age (18+)</span></label>
            <input name="age" type="number" min={18} className="input input-bordered" value={form.age || ''} onChange={handleChange} required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Gender</span></label>
            <select name="gender" className="select select-bordered" value={form.gender || ''} onChange={handleChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Mobile</span></label>
          <input name="mobile" type="tel" className="input input-bordered" value={form.mobile || ''} onChange={handleChange} required />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Email</span></label>
          <input name="email" type="email" className="input input-bordered" value={form.email || ''} onChange={handleChange} />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">District</span></label>
          <input name="district" className="input input-bordered" value={form.district || ''} onChange={handleChange} />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Area</span></label>
          <input name="area" className="input input-bordered" value={form.area || ''} onChange={handleChange} />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Last Donation Date</span></label>
          <input name="lastDonationDate" type="date" className="input input-bordered" value={form.lastDonationDate || ''} onChange={handleChange} />
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input name="healthEligible" type="checkbox" className="checkbox checkbox-error" checked={form.healthEligible || false} onChange={handleChange} />
            <span className="label-text">I confirm I am eligible to donate (health check)</span>
          </label>
        </div>
        <button type="submit" className="btn btn-error text-white" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</button>
      </form>
    </div>
  );
}
