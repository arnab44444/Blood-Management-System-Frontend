import { Link } from 'react-router';

export default function Awareness() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-error mb-6">Blood Donation Awareness</h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Eligibility</h2>
        <ul className="list-disc list-inside space-y-1 text-base-content/90">
          <li>Age 18–65 (varies by region)</li>
          <li>Weight at least 50 kg</li>
          <li>Hemoglobin level within range</li>
          <li>No serious illness or infection</li>
          <li>90-day gap between whole blood donations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Myths & Facts</h2>
        <div className="space-y-3 text-base-content/90">
          <p><strong>Myth:</strong> Donating blood weakens you. <strong>Fact:</strong> Your body replaces the volume quickly; rest and fluids help.</p>
          <p><strong>Myth:</strong> You can get diseases from donating. <strong>Fact:</strong> Sterile, single-use equipment is used.</p>
          <p><strong>Myth:</strong> Donating is painful. <strong>Fact:</strong> A brief pinch; most donors feel fine afterward.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Emergency Tips</h2>
        <p className="text-base-content/90">
          In an emergency, request blood through BloodConnect with &quot;Urgent&quot; level. Nearby donors with emergency availability are prioritized. Contact is shared only after admin verification.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Before You Donate</h2>
        <ul className="list-disc list-inside space-y-1 text-base-content/90">
          <li>Eat a light meal and stay hydrated</li>
          <li>Bring ID and any donor card</li>
          <li>Get enough sleep the night before</li>
        </ul>
      </section>

      <div className="flex gap-4 mt-8">
        <Link to="/auth/register" className="btn btn-error">Register as Donor</Link>
        <Link to="/" className="btn btn-ghost">Back to Home</Link>
      </div>
    </div>
  );
}
