import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { publicApi } from '../api';

const HERO_TITLE = 'Give blood, give life';
const HERO_SUBTITLE = 'A secure, community-driven platform for matching donors and patients.';
const HERO_TAGLINE = 'Join thousands of donors who are helping save lives daily.';
const HERO_PRIMARY_CTA = { label: 'Register as Donor', link: '/auth/register' };

export default function Home() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    publicApi.stats().then(({ data }) => setStats(data)).catch(() => setStats(null));
  }, []);

  return (
    <div className="relative w-full">
      {/* Hero (text-first design) */}
      <section className="relative flex min-h-[70vh] md:min-h-screen items-center justify-center bg-gradient-to-b from-red-600 via-red-500 to-red-700 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{HERO_TITLE}</h1>
          <p className="mt-4 text-lg text-white/85 md:text-xl">{HERO_SUBTITLE}</p>
          <p className="mt-4 text-sm text-white/70 md:text-base">{HERO_TAGLINE}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to={HERO_PRIMARY_CTA.link}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-red-700 shadow-lg shadow-black/30 transition hover:bg-white/90"
            >
              {HERO_PRIMARY_CTA.label}
            </Link>
            {/* <Link
              to={HERO_SECONDARY_CTA.link}
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3 text-sm text-white transition hover:bg-white/20"
            >
              {HERO_SECONDARY_CTA.label}
            </Link> */}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-base-300 bg-base-100 px-4 py-10 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-base-content mb-2">
            Platform at a glance
          </h2>
          <p className="text-center text-sm text-base-content/70 mb-8 max-w-md mx-auto">
            Real-time counts. No charge for donors or patients.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Donors */}
            <div className="rounded-xl border border-base-200 bg-base-100 p-6 text-center shadow-md hover:shadow-lg transition">
              <div className="text-3xl font-bold text-red-600">{stats?.donorsCount ?? '—'}</div>
              <div className="mt-1 text-sm font-medium text-base-content/80">Donors</div>
              <p className="mt-2 text-xs text-base-content/60">Registered blood donors</p>
            </div>

            {/* Blood requests */}
            <div className="rounded-xl border border-base-200 bg-base-100 p-6 text-center shadow-md hover:shadow-lg transition">
              <div className="text-3xl font-bold text-red-600">{stats?.requestsCount ?? '—'}</div>
              <div className="mt-1 text-sm font-medium text-base-content/80">Blood requests</div>
              <p className="mt-2 text-xs text-base-content/60">Total requests on platform</p>
            </div>

            {/* Urgent */}
            <div className="rounded-xl border border-base-200 bg-base-100 p-6 text-center shadow-md hover:shadow-lg transition">
              <div className="text-3xl font-bold text-yellow-500">{stats?.urgentCount ?? '—'}</div>
              <div className="mt-1 text-sm font-medium text-base-content/80">Urgent (pending)</div>
              <p className="mt-2 text-xs text-base-content/60">Need immediate attention</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}