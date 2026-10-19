export default function Container({ as: Element = 'div', className = '', children, ...props }) {
  return (
    <Element className={`page-shell ${className}`.trim()} {...props}>
      {children}
    </Element>
  );
}
