import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaEye, FaRegClock } from 'react-icons/fa';
import { getdata, getNewsDetailsById } from '@/lib/data';
import BrandMark from '@/components/shared/BrandMark';








export const generateMetadata =async ({ params }) => {
    const { id } = await params;
    const news = await getNewsDetailsById(id);
    return {

        title: news?.title || 'News Details',
        description: news?.details?.slice(0, 160) || 'This is the news details page of our website.',
    };
};

const formatDate = (date) => {
    if (!date) return 'Date unavailable';

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return 'Date unavailable';

    return new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Dhaka',
    }).format(parsedDate);
};

const NewsDetailPage = async ({ params }) => {
    const { id } = await params;
    const [news, categories] = await Promise.all([
        getNewsDetailsById(id),
        getdata().catch(() => []),
    ]);

    if (!news?.title) {
        return (
            <main className="grid min-h-[55vh] place-items-center bg-slate-50 px-4 py-16">
                <div className="max-w-lg text-center">
                    <BrandMark className="mx-auto h-16 w-16" />
                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-indigo-600">The Frontpage</p>
                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">Story not available</h1>
                    <p className="mt-3 text-sm leading-6 text-slate-600">This story may have moved. Head back to the latest headlines to keep reading.</p>
                    <Link href="/category/0" className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
                        <FaArrowLeft aria-hidden="true" className="text-xs" /> Latest headlines
                    </Link>
                </div>
            </main>
        );
    }

    const categoryName = categories.find((category) => String(category.category_id) === String(news.category_id))?.category_name;
    const image = news.image_url || news.thumbnail_url;
    const authorName = news.author?.name || 'The Frontpage Desk';
    const publishedDate = formatDate(news.author?.published_date || news.published_date);
    const views = Number(news.total_view || 0);
    const readMinutes = Math.max(1, Math.ceil((news.details || '').trim().split(/\s+/).filter(Boolean).length / 220));
    const tags = Array.isArray(news.tags) ? news.tags.filter(Boolean).slice(0, 6) : [];
    const isTrending = news.others_info?.is_trending ?? news.others?.is_trending;
    const isTodaysPick = news.others_info?.is_todays_pick ?? news.others?.is_today_pick;
    const categoryHref = `/category/${news.category_id ?? 0}`;

    return (
        <main className="min-h-screen bg-slate-50 pb-16">
            <div className="mx-auto w-full max-w-[1180px] px-4 pt-7 sm:px-6 sm:pt-10 lg:px-8">
                <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 sm:mb-9 sm:text-sm">
                    <Link href="/" className="transition hover:text-indigo-700">Home</Link>
                    <span aria-hidden="true" className="text-slate-300">/</span>
                    <Link href={categoryHref} className="transition hover:text-indigo-700">{categoryName || 'Latest news'}</Link>
                    <span aria-hidden="true" className="text-slate-300">/</span>
                    <span className="max-w-[45vw] truncate text-slate-700" aria-current="page">{news.title}</span>
                </nav>

                <article className="overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_24px_70px_-48px_rgba(15,23,42,0.4)] sm:rounded-[2rem]">
                    <header className="px-5 pb-7 pt-7 sm:px-9 sm:pb-9 sm:pt-10 lg:px-14 lg:pt-14">
                        <div className="mb-5 flex flex-wrap items-center gap-3">
                            <Link href={categoryHref} className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-800 transition hover:bg-indigo-100">
                                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#f97360]" />
                                {categoryName || 'Latest news'}
                            </Link>
                            {isTrending && (
                                <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-700">Trending</span>
                            )}
                            {isTodaysPick && (
                                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600">Today’s pick</span>
                            )}
                        </div>

                        <h1 className="max-w-5xl text-[2.1rem] font-extrabold leading-[1.12] tracking-[-0.045em] text-slate-950 sm:text-5xl sm:leading-[1.08] lg:text-[3.65rem]">
                            {news.title}
                        </h1>

                        <div className="mt-7 flex flex-col gap-5 border-t border-slate-100 pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex min-w-0 items-center gap-3.5">
                                {news.author?.img ? (
                                    <Image src={news.author.img} alt="" width={48} height={48} unoptimized className="h-12 w-12 shrink-0 rounded-full object-cover ring-4 ring-indigo-50" />
                                ) : (
                                    <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-base font-bold text-indigo-800 ring-4 ring-indigo-50">{authorName.charAt(0)}</span>
                                )}
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-slate-900">{authorName}</p>
                                    <p className="mt-0.5 text-xs text-slate-500">The Frontpage newsroom</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500 sm:justify-end">
                                <span className="inline-flex items-center gap-2"><FaRegClock aria-hidden="true" className="text-indigo-500" />{publishedDate}</span>
                                <span className="inline-flex items-center gap-2"><FaEye aria-hidden="true" className="text-indigo-500" />{(Number.isFinite(views) ? views : 0).toLocaleString()} views</span>
                            </div>
                        </div>
                    </header>

                    <figure className="relative mx-4 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 sm:mx-9 lg:mx-14">
                        {image ? (
                            <Image src={image} alt={news.title} fill priority unoptimized sizes="(max-width: 768px) 100vw, 1100px" className="object-cover" />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-slate-100 to-orange-50">
                                <BrandMark className="h-16 w-16 sm:h-20 sm:w-20" />
                                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">The Frontpage</p>
                            </div>
                        )}
                        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/20 to-transparent" />
                    </figure>

                    <div className="grid gap-10 px-5 py-8 sm:px-9 sm:py-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14 lg:px-14 lg:py-12">
                        <section aria-label="Article text" className="min-w-0">
                            <div className="mb-6 flex items-center gap-3">
                                <span aria-hidden="true" className="h-8 w-1 rounded-full bg-[#f97360]" />
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">The story</p>
                            </div>
                            {news.details ? (
                                news.details.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => (
                                    <p key={index} className={`mb-6 text-[16px] leading-[1.9] text-slate-700 sm:text-[17px] ${index === 0 ? 'first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-5xl first-letter:font-extrabold first-letter:leading-[0.85] first-letter:text-indigo-950' : ''}`}>
                                        {paragraph.trim()}
                                    </p>
                                ))
                            ) : (
                                <p className="rounded-xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">The full story is not available right now.</p>
                            )}

                            <div className="mt-10 border-t border-slate-200 pt-6">
                                <Link href={categoryHref} className="group inline-flex items-center gap-2 text-sm font-bold text-indigo-800 transition hover:text-indigo-600">
                                    <FaArrowLeft aria-hidden="true" className="text-xs transition-transform group-hover:-translate-x-1" />
                                    More from {categoryName || 'the latest'}
                                </Link>
                            </div>
                        </section>

                        <aside className="space-y-5 lg:pt-1" aria-label="Story information">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-indigo-600">At a glance</p>
                                <dl className="mt-5 space-y-4">
                                    <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
                                        <dt className="text-xs text-slate-500">Published</dt>
                                        <dd className="text-right text-xs font-semibold text-slate-800">{publishedDate}</dd>
                                    </div>
                                    <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
                                        <dt className="text-xs text-slate-500">Reading time</dt>
                                        <dd className="text-xs font-semibold text-slate-800">{readMinutes} min</dd>
                                    </div>
                                    <div className="flex items-start justify-between gap-3">
                                        <dt className="text-xs text-slate-500">Readers</dt>
                                        <dd className="text-xs font-semibold text-slate-800">{(Number.isFinite(views) ? views : 0).toLocaleString()}</dd>
                                    </div>
                                </dl>
                            </div>

                            {tags.length > 0 && (
                                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-indigo-600">In this story</p>
                                    <ul className="mt-4 flex flex-wrap gap-2">
                                        {tags.map((tag) => (
                                            <li key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">{tag}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <Link href={categoryHref} className="group flex items-center justify-between gap-3 rounded-2xl bg-indigo-950 p-5 text-white transition hover:bg-indigo-900 sm:p-6">
                                <span>
                                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-200">Keep reading</span>
                                    <span className="mt-1 block text-sm font-bold">Explore the headlines</span>
                                </span>
                                <FaArrowRight aria-hidden="true" className="shrink-0 text-sm transition-transform group-hover:translate-x-1" />
                            </Link>
                        </aside>
                    </div>
                </article>

                <div className="mt-7 flex justify-center">
                    <Link href="/category/0" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-slate-500 transition hover:bg-white hover:text-indigo-700">
                        <FaArrowLeft aria-hidden="true" className="text-[10px]" /> Back to all headlines
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NewsDetailPage;
