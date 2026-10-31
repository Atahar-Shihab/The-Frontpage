import { Suspense } from 'react';
import LeftSidebar from '@/components/homepage/news/LeftSidebar';
import RightSidebar from '@/components/homepage/news/RightSidebar';
import { getdata, getdataByCategory } from '@/lib/data';
import NewsCard from '@/components/homepage/news/NewsCard';

const NewsCategoryContent = async ({ params }) => {
    const { id } = await params;
    const [categories, newsByCategory] = await Promise.all([
        getdata(),
        getdataByCategory(id),
    ]);
    const categoryName = categories.find((category) => String(category.category_id) === String(id))?.category_name;
    const stories = newsByCategory?.data || [];

    return (
        <main className="mx-auto my-10 grid w-full max-w-[1440px] grid-cols-1 gap-8 px-4 sm:px-6 lg:my-14 lg:grid-cols-12 lg:gap-8">
            <aside className="lg:col-span-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Explore</p>
                    <h2 className="mt-1 text-lg font-bold text-slate-900">Categories</h2>
                    <LeftSidebar categories={categories} activeId={id} />
                </div>
            </aside>

            <section className="min-w-0 lg:col-span-7" aria-labelledby="news-heading">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-5 sm:mb-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">The latest</p>
                        <h1 id="news-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                            {categoryName || 'News'}
                        </h1>
                    </div>
                    <p className="text-sm text-slate-500">{stories.length} {stories.length === 1 ? 'story' : 'stories'}</p>
                </div>

                {stories.length > 0 ? (
                    <div className="space-y-6 sm:space-y-7">
                        {stories.map((news) => (
                            <NewsCard key={news._id || news.id} news={news} categoryName={categoryName} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                        <p className="text-lg font-semibold text-slate-800">No stories here yet</p>
                        <p className="mt-2 text-sm text-slate-500">Try another category to find the latest headlines.</p>
                    </div>
                )}
            </section>

            <aside className="lg:col-span-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                    <RightSidebar />
                </div>
            </aside>
        </main>
    );
};

const NewsCategoryPage = ({ params }) => (
    <Suspense
        fallback={
            <main className="mx-auto my-10 grid w-full max-w-[1440px] grid-cols-1 gap-8 px-4 sm:px-6 lg:my-14 lg:grid-cols-12 lg:gap-8" aria-label="Loading news">
                <div className="h-72 animate-pulse rounded-2xl bg-slate-100 lg:col-span-2" />
                <div className="space-y-6 lg:col-span-7">
                    <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                    <div className="h-[28rem] animate-pulse rounded-2xl bg-slate-100" />
                    <div className="h-[28rem] animate-pulse rounded-2xl bg-slate-100" />
                </div>
                <div className="h-72 animate-pulse rounded-2xl bg-slate-100 lg:col-span-3" />
            </main>
        }
    >
        <NewsCategoryContent params={params} />
    </Suspense>
);

export default NewsCategoryPage;
