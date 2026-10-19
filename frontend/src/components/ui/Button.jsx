import { Link } from 'react-router-dom';

const styles = {
  primary: 'bg-gold text-obsidian hover:bg-gold-soft',
  ghost: 'border border-gold/40 bg-transparent text-ivory hover:border-gold hover:text-gold',
  subtle: 'bg-white/5 text-ivory hover:bg-white/10',
};

export default function Button({
  as: Element = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  children,
  to,
  ...props
}) {
  const Component = to ? Link : Element;
  return (
    <Component
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 ${styles[variant] || styles.primary} ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`.trim()}
      disabled={Element === 'button' ? disabled : undefined}
      to={to}
      {...props}
    >
      {children}
    </Component>
  );
}