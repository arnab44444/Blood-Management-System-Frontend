import { Link } from 'react-router';
import { HeartPulse, Home, ArrowLeft, Search } from 'lucide-react';

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 flex flex-col items-center">
        {/* Glow & Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-rose-500/20 blur-2xl rounded-full" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30">
            <HeartPulse className="w-10 h-10 animate-pulse" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold tracking-wider uppercase mb-3">
          Error 404
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Page Not Found
        </h1>

        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          The page you are looking for might have been moved, removed, or does not exist in the Blood Management Network.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-rose-600/25 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-8">
        Need urgent blood emergency support? Contact the nearest hospital or emergency helpline.
      </p>
    </div>
  );
}
