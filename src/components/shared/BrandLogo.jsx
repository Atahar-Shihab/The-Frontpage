import Link from 'next/link';
import BrandMark from './BrandMark';

const BrandLogo = ({ compact = false }) => (
    <Link href="/" className={`inline-flex items-center gap-3 text-left ${compact ? '' : 'justify-center'}`} aria-label="The Frontpage home">
        <BrandMark className={compact ? 'h-10 w-10 shrink-0' : 'h-14 w-14 shrink-0 sm:h-16 sm:w-16'} />
        <span className="flex flex-col leading-none">
            <span className={`font-semibold uppercase tracking-[0.32em] text-slate-500 ${compact ? 'text-[9px]' : 'text-[10px] sm:text-[11px]'}`}>The</span>
            <span className={`mt-1 font-black uppercase tracking-[-0.055em] text-slate-950 ${compact ? 'text-lg' : 'text-2xl sm:text-3xl'}`}>Frontpage</span>
        </span>
    </Link>
);

export default BrandLogo;
