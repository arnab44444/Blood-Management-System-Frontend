import { useState } from 'react';
import { Link } from 'react-router';
import { bloodRequestsApi } from '../api';

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
      alert(err.response?.data?.message || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="max-w-md space-y-4">
        <div className="alert alert-success">
          Blood request submitted. Donors will be notified and contact will be shared after admin approval.
        </div>
        <p className="text-sm text-base-content/70">What you can do next:</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/requests" className="btn btn-error btn-sm">My Requests</Link>
          <Link to="/dashboard/search-donors" className="btn btn-outline btn-error btn-sm">Search Donors</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Request Blood</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label"><span className="label-text">Patient Name</span></label>
          <input name="patientName" className="input input-bordered" value={form.patientName} onChange={handleChange} required />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Required Blood Group</span></label>
          <select name="bloodGroup" className="select select-bordered" value={form.bloodGroup} onChange={handleChange} required>
            <option value="">Select</option>
            {BLOOD_GROUPS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Number of Bags</span></label>
          <input name="bags" type="number" min={1} className="input input-bordered" value={form.bags} onChange={handleChange} />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Hospital Name</span></label>
          <input name="hospitalName" className="input input-bordered" value={form.hospitalName} onChange={handleChange} required />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Location</span></label>
          <input name="location" className="input input-bordered" value={form.location} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Required Date</span></label>
            <input name="requiredDate" type="date" className="input input-bordered" value={form.requiredDate} onChange={handleChange} />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Time</span></label>
            <input name="requiredTime" type="time" className="input input-bordered" value={form.requiredTime} onChange={handleChange} />
          </div>
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Emergency Level</span></label>
          <select name="emergencyLevel" className="select select-bordered" value={form.emergencyLevel} onChange={handleChange}>
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Contact Number</span></label>
          <input name="contactNumber" type="tel" className="input input-bordered" value={form.contactNumber} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-error text-white" disabled={loading}>{loading ? 'Submitting...' : 'Submit Request'}</button>
      </form>
    </div>
  );
}
