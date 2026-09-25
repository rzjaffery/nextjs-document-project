// app/comic-vault/components/navbar.tsx
'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SearchForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('query') || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/comic-vault?query=${encodeURIComponent(query.trim())}&page=1`);
        } else {
            router.push('/comic-vault');
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative flex-1 sm:max-w-md">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search comics, Spider-Man, Batman..."
                    className="w-full rounded-lg border border-gray-800 bg-gray-900 py-2 pl-4 pr-10 text-sm text-white placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
                <button
                    type="submit"
                    className="absolute right-1 rounded-md bg-red-600 px-3 py-1 text-xs font-bold uppercase text-white transition hover:bg-red-700"
                >
                    Search
                </button>
            </div>
        </form>
    );
}

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 mb-8 border-b border-gray-800 bg-black/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">

                {/* Left Section: Back to Root Link & Brand Logo */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">

                    {/* Back Navigation Button to Hub */}
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 rounded-lg border border-gray-800 bg-gray-900 px-3 py-1.5 text-xs font-semibold text-gray-400 transition hover:border-red-600 hover:bg-gray-800 hover:text-white"
                    >
                        <span>←</span>
                        <span>Home</span>
                    </Link>

                    {/* Brand Logo */}
                    <Link href="/comic-vault" className="flex items-center gap-2 group">
            <span className="rounded bg-red-600 px-2 py-1 text-xs font-black uppercase text-white transition group-hover:bg-red-700">
              Vault
            </span>
                        <span className="text-xl font-black uppercase tracking-wider text-white">
              Comics
            </span>
                    </Link>

                    {/* Quick Links */}
                    <nav className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider sm:text-sm">
                        <Link
                            href="/comic-vault"
                            className="text-gray-300 transition hover:text-red-500"
                        >
                            New Comics
                        </Link>
                        <Link
                            href="/comic-vault?sort=cover_date:desc"
                            className="hidden text-gray-400 transition hover:text-red-500 md:inline"
                        >
                            Recent Releases
                        </Link>
                    </nav>
                </div>

                {/* Search Bar wrapped in Suspense */}
                <Suspense fallback={
                               <div className="h-9 w-full sm:max-w-md rounded-lg bg-gray-900 animate-pulse" />
                          }>
                    <SearchForm />
                </Suspense>

            </div>
        </header>
    );
}