'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    limit: number;
    totalResults: number;
}

export function Pagination({ currentPage, limit, totalResults }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const totalPages = Math.ceil(totalResults / limit);

    // Helper to construct URL with updated params
    const createPageUrl = (page: number, newLimit?: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        params.set('limit', (newLimit || limit).toString());
        return `${pathname}?${params.toString()}`;
    };

    // Handles dropdown change
    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLimit = Number(e.target.value);
        // Reset to page 1 when changing items per page to prevent out-of-bounds
        router.push(createPageUrl(1, selectedLimit));
    };

    return (
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-800 bg-gray-900 p-4 sm:flex-row">
            {/* Dropdown for items per page */}
            <div className="flex items-center gap-2 text-sm text-gray-300">
                <label htmlFor="limit-select">Show:</label>
                <select
                    id="limit-select"
                    value={limit}
                    onChange={handleLimitChange}
                    className="rounded border border-gray-700 bg-black px-3 py-1 text-white focus:border-red-500 focus:outline-none"
                >
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={40}>40 per page</option>
                </select>
            </div>

            {/* Current Page Indicator */}
            <span className="text-sm text-gray-400">
        Page <strong className="text-white">{currentPage}</strong> of{' '}
                <strong className="text-white">{totalPages}</strong>
      </span>

            {/* Pagination Buttons */}
            <div className="flex gap-2">
                {currentPage > 1 ? (
                    <Link
                        href={createPageUrl(currentPage - 1)}
                        className="rounded bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                    >
                        Previous
                    </Link>
                ) : (
                    <button
                        disabled
                        className="cursor-not-allowed rounded bg-gray-800/50 px-4 py-2 text-sm font-medium text-gray-500"
                    >
                        Previous
                    </button>
                )}

                {currentPage < totalPages ? (
                    <Link
                        href={createPageUrl(currentPage + 1)}
                        className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                        Next
                    </Link>
                ) : (
                    <button
                        disabled
                        className="cursor-not-allowed rounded bg-gray-800/50 px-4 py-2 text-sm font-medium text-gray-500"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}