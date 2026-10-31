const BrandMark = ({ className = 'h-12 w-12' }) => (
    <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <rect width="48" height="48" rx="14" fill="#172554" />
        <path d="M13 8.5h15.5L37 17v23H13V8.5Z" fill="#fff" />
        <path d="M28.5 8.5V17H37" fill="#c7d2fe" />
        <path d="M18 22h14M18 27h14M18 32h8" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 36h8" stroke="#f97360" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

export default BrandMark;
