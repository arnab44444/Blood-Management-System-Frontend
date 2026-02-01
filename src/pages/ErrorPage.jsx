import { Link } from 'react-router';

export default function ErrorPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-error">404</h1>
      <p>Page not found.</p>
      <Link to="/" className="btn btn-error">Go Home</Link>
    </div>
  );
}
