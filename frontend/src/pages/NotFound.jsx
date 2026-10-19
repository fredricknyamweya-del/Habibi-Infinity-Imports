import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="page-shell grid min-h-[60vh] place-items-center py-16 text-center">
      <div><p className="text-xs uppercase tracking-[0.3em] text-gold">404 · Page not found</p><h1 className="mt-3 font-heading text-5xl">This page has wandered.</h1><p className="mt-4 text-sm text-muted">Let’s take you back to beautiful things.</p><Link className="mt-7 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-obsidian" to="/">Return home</Link></div>
    </main>
  );
}