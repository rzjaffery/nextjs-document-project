import { getComics, getVaultStats } from './lib/comic-api';
import { ComicGrid } from './components/comic-grid';
import { Pagination } from './components/pagination';
import {StatsBarRoot} from "@/app/comic-vault/components/stats-bar-root";

// Instruct Next.js to render this page dynamically per request
export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams: Promise<{ page?: string; limit?: string; query?: string }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const page = Number(resolvedParams?.page) || 1;
    const limit = Number(resolvedParams?.limit) || 20;
    const query = resolvedParams?.query || '';

    const [{ comics, total }, stats] = await Promise.all([
        getComics(page, limit, query),
        getVaultStats(),
    ]);

    return (
        <div className="min-h-screen bg-black text-white">

            <main className="px-4 pb-12 sm:px-8">
                <header className="mb-6">
                    <h1 className="text-2xl font-extrabold uppercase tracking-wider text-red-600 sm:text-3xl">
                        {query ? `Search Results for "${query}"` : 'Comic Vault Catalog'}
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Showing {comics.length} of {total} comics
                    </p>
                </header>

                <StatsBarRoot
                    volumesCount={stats.volumesCount}
                    episodesCount={stats.episodesCount}
                    moviesCount={stats.moviesCount}
                />

                <ComicGrid comics={comics} />

                <Pagination
                    currentPage={page}
                    limit={limit}
                    totalResults={total}
                />
            </main>
        </div>
    );
}