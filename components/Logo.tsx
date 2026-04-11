export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 0 180 52" className={className}>
      <line x1="0" y1="4" x2="176" y2="4" stroke="#0A1628" strokeWidth="1.5" />
      <line x1="0" y1="7.5" x2="176" y2="7.5" stroke="#0A1628" strokeWidth="0.5" />
      <rect x="0" y="10.5" width="40" height="3.5" fill="#0A1628" />
      <rect x="2" y="14" width="36" height="2.5" fill="#0A1628" />
      <rect x="3.5" y="16.5" width="4" height="21" fill="#0A1628" />
      <rect x="18" y="16.5" width="4" height="21" fill="#0A1628" />
      <rect x="32.5" y="16.5" width="4" height="21" fill="#0A1628" />
      <rect x="2" y="37.5" width="36" height="2.5" fill="#0A1628" />
      <rect x="0" y="40" width="40" height="3.5" fill="#0A1628" />
      <line x1="0" y1="45.5" x2="176" y2="45.5" stroke="#0A1628" strokeWidth="0.5" />
      <line x1="0" y1="49" x2="176" y2="49" stroke="#0A1628" strokeWidth="1.5" />
      <text x="48" y="25" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="15" fontWeight="400" letterSpacing="4" fill="#0A1628">THE CHANGE</text>
      <text x="48" y="39" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="11.5" fontWeight="400" letterSpacing="5.5" fill="#0A1628">ASSOCIATION</text>
    </svg>
  );
}
