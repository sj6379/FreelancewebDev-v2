export const FreelanceLogo = ({ size = 32, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="64" height="64" rx="8" fill="#171717"/>
    <rect x="16" y="12" width="8" height="40" fill="white"/>
    <rect x="16" y="12" width="24" height="8" fill="white"/>
    <rect x="16" y="28" width="16" height="8" fill="white"/>
    <circle cx="48" cy="16" r="4" fill="#facc15"/>
  </svg>
);
