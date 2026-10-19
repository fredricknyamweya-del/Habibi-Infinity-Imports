export default function Input({ label, id, className = '', ...props }) {
  return (
    <label className="grid gap-2 text-sm text-muted" htmlFor={id}>
      {label}
      <input
        id={id}
        className={`min-h-11 w-full rounded-lg border border-white/15 bg-obsidian px-3 text-ivory placeholder:text-muted focus:border-gold ${className}`.trim()}
        {...props}
      />
    </label>
  );
}