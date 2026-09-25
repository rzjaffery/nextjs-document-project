import {getComics, getVaultStats} from "@/app/comic-vault/lib/comic-api";
import {StatsBarRoot} from "@/app/comic-vault/components/stats-bar-root";
import {ComicGrid} from "@/app/comic-vault/components/comic-grid";
import {Pagination} from "@/app/comic-vault/components/pagination";

interface PageProps {
    searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const page = Number(resolvedParams?.page) || 1;
    const limit = Number(resolvedParams?.limit) || 20;

    // Fetch comics and database stats concurrently on the server
    const [{ comics, total }, stats] = await Promise.all([
        getComics(page, limit),
        getVaultStats(),
    ]);

    return (
        <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
            <header className="mb-6">
                <h1 className="text-3xl font-extrabold uppercase tracking-wider text-red-600 sm:text-4xl">
                    Comic Vault Catalog
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                    Explore total catalog metrics and recent issues.
                </p>
            </header>

            {/* Stats Bar Component */}
            <StatsBarRoot
                volumesCount={stats.volumesCount}
                episodesCount={stats.episodesCount}
                moviesCount={stats.moviesCount}
            />

            {/* Catalog Grid */}
            <ComicGrid comics={comics} />

            {/* Pagination Bar */}
            <Pagination
                currentPage={page}
                limit={limit}
                totalResults={total}
            />
        </main>
    );
}