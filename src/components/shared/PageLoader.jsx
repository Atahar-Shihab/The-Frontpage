import BrandMark from './BrandMark';

const PageLoader = ({ message = 'Loading the latest stories' }) => (
    <main className="flex min-h-[48vh] items-center justify-center px-6 py-16" role="status" aria-live="polite">
        <div className="flex flex-col items-center text-center">
            <div className="relative mb-7 grid h-24 w-24 place-items-center">
                <span aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-indigo-100 border-t-indigo-600 motion-safe:animate-spin motion-reduce:animate-none" />
                <span aria-hidden="true" className="absolute inset-2 rounded-full border border-slate-200" />
                <BrandMark className="h-12 w-12" />
                <span aria-hidden="true" className="absolute right-0 top-1 h-3 w-3 rounded-full bg-[#f97360] ring-4 ring-white motion-safe:animate-pulse" />
            </div>
            <p className="text-xl font-black uppercase tracking-[-0.04em] text-slate-950">The Frontpage</p>
            <p className="mt-5 text-sm font-medium text-slate-500">{message}<span className="motion-safe:animate-pulse">...</span></p>
            <div aria-hidden="true" className="mt-6 h-1 w-36 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-[#f97360] motion-safe:animate-pulse" />
            </div>
        </div>
    </main>
);

export default PageLoader;
