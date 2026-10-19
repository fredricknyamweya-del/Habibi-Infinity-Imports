const themes = {
  Sale: 'border-red-400/30 bg-red-400/10 text-red-200',
  New: 'border-gold/40 bg-gold/10 text-gold-soft',
  Sponsored: 'border-white/15 bg-white/5 text-muted',
};

export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${themes[children] || themes.Sponsored} ${className}`.trim()}>
      {children}
    </span>
  );
}