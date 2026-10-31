import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaEye, FaRegClock } from 'react-icons/fa';

const formatDate = (date) => {
    if (!date) return 'Date unavailable';

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return 'Date unavailable';

    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(parsedDate);
};

const NewsCard = ({ news, categoryName }) => {
    const image = news.thumbnail_url || news.image_url;
    const authorName = news.author?.name || 'Frontpage Desk';
    const publishedDate = formatDate(news.author?.published_date);
    const storyLink = `/news/${news._id || news.id}`;

    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_35px_-24px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-28px_rgba(15,23,42,0.38)]">
            <Link
                href={storyLink}
                aria-label={`Read: ${news.title}`}
                className="relative block aspect-[16/9] overflow-hidden bg-slate-100"
            >
                {image ? (
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        unoptimized
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-100 via-slate-100 to-amber-100">
                        <span className="text-sm font-semibold tracking-[0.2em] text-slate-400">THE FRONTPAGE</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-700 shadow-sm">
                        {categoryName || `Category ${news.category_id ?? ''}`}
                    </span>
                    {news.others?.is_trending && (
                        <span className="rounded-full border border-white/25 bg-slate-950/55 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
                            Trending
                        </span>
                    )}
                </div>
            </Link>

            <div className="p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1.5"><FaRegClock aria-hidden="true" className="text-indigo-500" />{publishedDate}</span>
                    <span aria-hidden="true" className="h-3 w-px bg-slate-300" />
                    <span className="inline-flex items-center gap-1.5"><FaEye aria-hidden="true" className="text-indigo-500" />{Number(news.total_view || 0).toLocaleString()} views</span>
                </div>

                <h2 className="text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-indigo-700 sm:text-[22px]">
                    <Link href={storyLink} className="focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600">
                        {news.title}
                    </Link>
                </h2>

                {news.details && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 font-normal text-slate-600">
                        {news.details}
                    </p>
                )}

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                    <div className="flex min-w-0 items-center gap-3">
                        {news.author?.img ? (
                            <Image src={news.author.img} alt="" width={40} height={40} unoptimized className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-slate-100" />
                        ) : (
                            <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">{authorName.charAt(0)}</span>
                        )}
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">{authorName}</p>
                            <p className="text-xs text-slate-500">Staff writer</p>
                        </div>
                    </div>
                    <Link href={storyLink} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Read story <FaArrowRight aria-hidden="true" className="text-xs transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default NewsCard;
