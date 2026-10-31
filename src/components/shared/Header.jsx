import CurrentDate from './CurrentDate';
import BrandLogo from './BrandLogo';

const Header = () => {
    return (
        <header className="border-b border-slate-100 bg-white px-4 py-7 text-center sm:py-9">
            <BrandLogo />
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.28em]">
                Journalism without fear or favour
            </p>
            <div className="mx-auto mt-3 h-px w-10 bg-[#f97360]" />
            <div className="mt-2 text-xs text-slate-500">
                <CurrentDate />
            </div>
        </header>
    );
};

export default Header;
