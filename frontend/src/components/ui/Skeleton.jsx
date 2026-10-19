export default function Skeleton({ className = '', ...props }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-white/10 ${className}`.trim()}
      {...props}
    />
  );
}