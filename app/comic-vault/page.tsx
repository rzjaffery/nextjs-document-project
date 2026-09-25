import {getComics, getVaultStats} from "@/app/comic-vault/lib/comic-api";
import {StatsBarRoot} from "@/app/comic-vault/components/stats-bar-root";
import {ComicGrid} from "@/app/comic-vault/components/comic-grid";
import {Pagination} from "@/app/comic-vault/components/pagination";
import {Navbar} from "@/app/comic-vault/components/navbar";

interface PageProps {
    searchParams: Promise<{ page?: string; limit?: string; query?: string }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const page = Number(resolvedParams?.page) || 1;
    const limit = Number(resolvedParams?.limit) || 20;
    const query = resolvedParams?.query || '';

    // Fetch comics and database stats concurrently on the server
    const [{ comics, total }, stats] = await Promise.all([
        getComics(page, limit, query),
        getVaultStats(),
    ]);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navbar Header at top of main screen */}


            <main className="px-4 pb-12 sm:px-8">
                <header className="mb-6">
                    <h1 className="text-2xl font-extrabold uppercase tracking-wider text-red-600 sm:text-3xl">
                        {query ? `Search Results for "${query}"` : 'Comic Vault Catalog'}
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Showing {comics.length} of {total} comics
                    </p>
                </header>

                {/* Catalog Metrics */}
                <StatsBarRoot
                    volumesCount={stats.volumesCount}
                    episodesCount={stats.episodesCount}
                    moviesCount={stats.moviesCount}
                />

                {/* Comic Catalog Grid */}
                <ComicGrid comics={comics} />

                {/* Pagination Controls */}
                <Pagination
                    currentPage={page}
                    limit={limit}
                    totalResults={total}
                />
            </main>
        </div>
    );
}