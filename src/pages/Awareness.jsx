import { Link } from 'react-router';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Heart,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function Awareness() {
  const ELIGIBILITY = [
    { title: 'Age Requirement', desc: 'Must be between 18 to 60 years old.' },
    { title: 'Minimum Weight', desc: 'At least 50 kg (110 lbs) for whole blood donation.' },
    { title: 'Hemoglobin Level', desc: 'Minimum 12.5 g/dL for females and 13.0 g/dL for males.' },
    { title: 'Health Status', desc: 'Free of fever, active infection, or severe cardiovascular diseases.' },
    { title: 'Time Interval', desc: 'At least 90 days (3 months) since your last whole blood donation.' },
  ];

  const MYTHS_FACTS = [
    {
      myth: 'Donating blood makes you physically weak or damages your health.',
      fact: 'Your bone marrow replenishes lost plasma in 24-48 hours and red cells in a few weeks. It actually stimulates fresh blood cell production.',
    },
    {
      myth: 'I can catch an infection like HIV or Hepatitis by donating.',
      fact: 'Zero risk! Certified, single-use, sterile needles and bags are opened right before you and incinerated immediately afterward.',
    },
    {
      myth: 'The process is extremely painful and takes too much time.',
      fact: 'You will only feel a mild pinch for 2 seconds. The entire donation takes only 8-10 minutes.',
    },
    {
      myth: 'I am taking prescription medication, so I can never donate.',
      fact: 'Most regular medications (like mild blood pressure or vitamins) are completely acceptable after standard doctor screening.',
    },
  ];

  const DOS_DONTS = [
    {
      type: 'do',
      items: [
        'Drink plenty of water or fruit juice (500ml) before donating',
        'Eat a healthy, low-fat meal 2-3 hours prior to donation',
        'Get at least 7-8 hours of sound sleep the night before',
        'Rest for 10-15 minutes and enjoy light refreshments afterward',
      ],
    },
    {
      type: 'dont',
      items: [
        'Do not donate on an empty stomach or skip meals',
        'Avoid smoking for at least 2 hours before and after donation',
        'Avoid alcohol consumption for 24 hours prior to donation',
        'Do not lift heavy weights or do intense workouts right after',
      ],
    },
  ];

  return (
    <div className="w-full bg-slate-50 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Medical Awareness & Facts
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Everything You Need to Know About Blood Donation
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Safe, simple, and heroic. Learn how voluntary donation saves lives and keeps our community healthy.
          </p>
        </div>

        {/* Eligibility Criteria Cards */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Eligibility Checklist</h2>
              <p className="text-xs text-slate-500">Ensure you meet these basic criteria before donating</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ELIGIBILITY.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50/40 hover:border-emerald-200 transition"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Myths vs Facts Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Debunking Common Myths
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Scientific facts behind the most common misconceptions about blood donation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MYTHS_FACTS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-rose-600">Myth</span>
                    <p className="text-sm font-bold text-slate-900">{item.myth}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-emerald-600">Fact</span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.fact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Do's */}
          <div className="bg-emerald-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-200">
            <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> What You SHOULD Do
            </h3>
            <ul className="space-y-3">
              {DOS_DONTS[0].items.map((it, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  {it}
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-rose-50/60 rounded-3xl p-6 sm:p-8 border border-rose-200">
            <h3 className="text-lg font-bold text-rose-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" /> What You Should AVOID
            </h3>
            <ul className="space-y-3">
              {DOS_DONTS[1].items.map((it, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-950 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-2 shrink-0" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ready to Save a Life CTA */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-8 text-center text-white space-y-4 shadow-xl shadow-red-600/20">
          <h2 className="text-2xl sm:text-3xl font-black">Ready to Make a Difference?</h2>
          <p className="text-white/90 text-sm max-w-lg mx-auto">
            Join our nationwide network of heroes. Sign up in less than 2 minutes.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/auth/register"
              className="px-8 py-3.5 rounded-xl bg-white text-red-600 font-bold text-sm shadow-md hover:bg-slate-100 transition inline-flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-red-600 text-red-600" /> Register as Donor
            </Link>
            <Link
              to="/"
              className="px-8 py-3.5 rounded-xl bg-red-700/60 text-white font-bold text-sm hover:bg-red-700 border border-white/20 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

