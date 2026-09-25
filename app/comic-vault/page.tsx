import { getComics } from './lib/comic-api';
import { ComicGrid } from './components/comic-grid';
import { Pagination } from './components/pagination';
import {Navbar} from "@/app/comic-vault/components/navbar";

interface PageProps {
    searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const page = Number(resolvedParams?.page) || 1;
    const limit = Number(resolvedParams?.limit) || 20;

    // Fetch comics based on URL parameters
    const { comics, total } = await getComics(page, limit);

    return (
        <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-8">
            <Navbar/>
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold uppercase tracking-wider text-red-600 sm:text-4xl">
                    Comic Vault Catalog
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                    Showing {comics.length} of {total} comics
                </p>
            </header>

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