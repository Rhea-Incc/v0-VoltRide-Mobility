import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <main className="not-found-page wrap">
      <div className="eyebrow">Route not found / 404</div>
      <h1 className="display">This road<br /><span>doesn’t lead anywhere.</span></h1>
      <p>The address may have changed. Return to VoltRide and choose another direction.</p>
      <Link className="button" href="/"><ArrowLeft aria-hidden="true" /> Return to VoltRide</Link>
    </main>
  );
}
