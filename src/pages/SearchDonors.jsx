import { useState, useEffect } from 'react';
import { donorsApi } from '../api';
import {
  Search,
  Droplet,
  MapPin,
  ShieldCheck,
  Award,
  Phone,
  CheckCircle2,
  Clock,
  Filter,
  UserCheck,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function SearchDonors() {
  const [filters, setFilters] = useState({ bloodGroup: '', district: '', available: 'true' });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    try {
      const { data } = await donorsApi.search(filters);
      setDonors(data);
    } catch {
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Find Voluntary Donors
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Filter verified voluntary blood donors across districts and blood groups
        </p>
      </div>

      {/* Filter Control Box */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        {/* Blood Group Pills */}
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Filter by Blood Group
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilters((f) => ({ ...f, bloodGroup: '' }))}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filters.bloodGroup === ''
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Groups
            </button>
            {BLOOD_GROUPS.map((bg) => (
              <button
                key={bg}
                type="button"
                onClick={() => setFilters((f) => ({ ...f, bloodGroup: bg }))}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  filters.bloodGroup === bg
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm scale-105'
                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        {/* Location & Availability Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3 border-t border-slate-100 items-center">
          <div className="sm:col-span-6 relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by District or Area (e.g. Dhaka, Chittagong)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-slate-50/60"
              value={filters.district}
              onChange={(e) => setFilters((f) => ({ ...f, district: e.target.value }))}
            />
          </div>

          <div className="sm:col-span-3 flex items-center gap-2 pl-2">
            <input
              type="checkbox"
              id="availOnly"
              checked={filters.available === 'true'}
              onChange={(e) =>
                setFilters((f) => ({ ...f, available: e.target.checked ? 'true' : 'false' }))
              }
              className="checkbox checkbox-error checkbox-sm rounded-lg"
            />
            <label htmlFor="availOnly" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Available Only
            </label>
          </div>

          <div className="sm:col-span-3">
            <button
              type="button"
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-md shadow-red-600/20 transition flex items-center justify-center gap-2"
              onClick={search}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Search Donors</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto" />
          <p className="text-xs text-slate-500 mt-2 font-semibold">Searching donor registry...</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {donors.map((d) => (
            <div
              key={d._id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-red-200 transition space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-sm">
                    {d.bloodGroup || '?'}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      {d.fullName}
                      {d.verified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-600" title="Verified Donor" />
                      )}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {[d.area, d.district].filter(Boolean).join(', ') || 'District not specified'}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                    d.available
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {d.available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              {/* Badges row */}
              <div className="flex flex-wrap gap-1.5 text-[11px] pt-1">
                {(d.donationCount ?? 0) > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-red-50 text-red-700 font-bold border border-red-100">
                    <Droplet className="w-3 h-3 fill-red-600 text-red-600" />
                    {d.donationCount} donation(s)
                  </span>
                )}
                {(d.donationCount ?? 0) >= 3 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-700 font-bold border border-amber-200">
                    <Award className="w-3 h-3 text-amber-500" /> Life Saver
                  </span>
                )}
                {d.emergencyAvailable && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-rose-100 text-rose-800 font-bold">
                    🚨 Emergency Ready
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-medium">
                  {d.canDonate ? 'Eligible now' : 'Cooldown (90 days)'}
                </span>
              </div>

              {/* Contact Info Footer */}
              <div className="pt-3 border-t border-slate-100">
                {d.mobile ? (
                  <div className="flex items-center justify-between bg-emerald-50 rounded-xl p-3 border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-emerald-600" /> {d.mobile}
                    </span>
                    <a
                      href={`tel:${d.mobile}`}
                      className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition"
                    >
                      Call Now
                    </a>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 font-medium italic">
                    🔒 Donor mobile number is revealed securely once your request is verified by Admin.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && donors.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Donors Found</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Try choosing &quot;All Groups&quot; or clearing the district filter to see available donors.
          </p>
        </div>
      )}
    </div>
  );
}

