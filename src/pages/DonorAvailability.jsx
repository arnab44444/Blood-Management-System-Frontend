import { useState, useEffect } from 'react';
import { donorsApi } from '../api';
import {
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Loader2,
  Heart,
  Droplet,
} from 'lucide-react';

export default function DonorAvailability() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    donorsApi
      .getProfile()
      .then(({ data }) => setProfile(data))
      .finally(() => setLoading(false));
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

  if (loading) {
    return (
      <div className="py-16 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto" />
        <p className="text-xs text-slate-500 mt-2 font-semibold">Loading availability settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Donation Availability
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Control when your profile appears in search results and whether you are available for urgent emergency calls.
        </p>
      </div>

      <div className="space-y-4">
        {/* Standard Availability Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                profile?.available
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              <Droplet className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Regular Donation Availability</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                When active, your profile is visible in public donor search to matching patients.
              </p>
              <span
                className={`inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md mt-2 ${
                  profile?.available
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {profile?.available ? '● Listed as Available' : '○ Paused (Hidden from Search)'}
              </span>
            </div>
          </div>

          <input
            type="checkbox"
            className="toggle toggle-error scale-110"
            checked={profile?.available ?? false}
            onChange={(e) => toggle('available', e.target.checked)}
            disabled={saving}
          />
        </div>

        {/* Emergency Availability Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                profile?.emergencyAvailable
                  ? 'bg-red-100 text-red-600'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                Emergency Fast-Response Mode
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Prioritizes your profile with an emergency badge for life-critical urgent cases.
              </p>
              <span
                className={`inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md mt-2 ${
                  profile?.emergencyAvailable
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {profile?.emergencyAvailable ? '🚨 Emergency Responder' : '○ Standard Response'}
              </span>
            </div>
          </div>

          <input
            type="checkbox"
            className="toggle toggle-error scale-110"
            checked={profile?.emergencyAvailable ?? false}
            onChange={(e) => toggle('emergencyAvailable', e.target.checked)}
            disabled={saving}
          />
        </div>
      </div>

      {/* Security note */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>
          <strong>Privacy Safeguard:</strong> Your phone number is never displayed publicly without admin verification for patient requests.
        </span>
      </div>
    </div>
  );
}

