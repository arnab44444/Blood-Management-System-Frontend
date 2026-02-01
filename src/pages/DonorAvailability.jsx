import { useState, useEffect } from 'react';
import { donorsApi } from '../api';

export default function DonorAvailability() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    donorsApi.getProfile().then(({ data }) => setProfile(data)).finally(() => setLoading(false));
  }, []);

  const toggle = async (field, value) => {
    if (!profile) return;
    setSaving(true);
    try {
      await donorsApi.updateProfile({ [field]: value });
      setProfile((p) => ({ ...p, [field]: value }));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <span className="loading loading-spinner loading-lg text-error" />;

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Availability</h1>
      <p className="text-base-content/70 mb-6">Control when you appear in donor search. Your contact is shared only after admin approval.</p>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-base-100 rounded-lg shadow">
          <div>
            <p className="font-medium">Available for donation</p>
            <p className="text-sm text-base-content/70">Show in search when you can donate</p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-error"
            checked={profile?.available ?? false}
            onChange={(e) => toggle('available', e.target.checked)}
            disabled={saving}
          />
        </div>
        <div className="flex items-center justify-between p-4 bg-base-100 rounded-lg shadow">
          <div>
            <p className="font-medium">Emergency availability</p>
            <p className="text-sm text-base-content/70">Prioritized for urgent requests</p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-error"
            checked={profile?.emergencyAvailable ?? false}
            onChange={(e) => toggle('emergencyAvailable', e.target.checked)}
            disabled={saving}
          />
        </div>
      </div>
    </div>
  );
}
