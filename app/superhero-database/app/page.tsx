'use client';

import { useEffect, useState } from "react";
import {Superhero} from "@/app/superhero-database/lib/types";
import {fetchSuperheroes} from "@/app/superhero-database/lib/superheroes";
import FilterControls from "@/app/superhero-database/ui/filter-controls";
import HeroCard from "@/app/superhero-database/ui/hero-card";
import Pagination from "@/app/superhero-database/ui/pagination";
import HeroModal from "@/app/superhero-database/ui/hero-modal";

export default function Home() {
    const [heroes, setHeroes] = useState<Superhero[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [alignment, setAlignment] = useState("all");
    const [publisher, setPublisher] = useState("all");
    const [sortBy, setSortBy] = useState("name-asc");
    const [selectedHero, setSelectedHero] = useState<Superhero | null>(null);
    const [mounted, setMounted] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(24);

    useEffect(() => {
        setMounted(true);
        fetchSuperheroes()
            .then((data) => {
                setHeroes(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Reset page to 1 on filter or sort change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, alignment, publisher, sortBy]);

    if (!mounted) return null;

    // Unique Publisher list for dropdown
    const publishers = Array.from(
        new Set(heroes.map((h) => h.biography.publisher).filter(Boolean))
    ).slice(0, 15) as string[];

    // 1. Filtering Logic
    const filteredHeroes = heroes.filter((hero) => {
        const matchesSearch = hero.name.toLowerCase().includes(search.toLowerCase());
        const matchesAlignment = alignment === "all" || hero.biography.alignment === alignment;
        const matchesPublisher = publisher === "all" || hero.biography.publisher === publisher;
        return matchesSearch && matchesAlignment && matchesPublisher;
    });

    // 2. Sorting Logic
    const sortedHeroes = [...filteredHeroes].sort((a, b) => {
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        if (sortBy === "intelligence") return (b.powerstats.intelligence || 0) - (a.powerstats.intelligence || 0);
        if (sortBy === "strength") return (b.powerstats.strength || 0) - (a.powerstats.strength || 0);
        if (sortBy === "power") return (b.powerstats.power || 0) - (a.powerstats.power || 0);
        if (sortBy === "totalPower") {
            const totalA = Object.values(a.powerstats).reduce((acc, val) => acc + (val || 0), 0);
            const totalB = Object.values(b.powerstats).reduce((acc, val) => acc + (val || 0), 0);
            return totalB - totalA;
        }
        return 0;
    });

    // 3. Pagination Calculations on sorted data
    const totalPages = Math.ceil(sortedHeroes.length / pageSize);
    const paginatedHeroes = sortedHeroes.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setCurrentPage(1);
    };

    return (
        <main className="min-h-screen bg-[#1a1a1a] text-white p-6 sm:p-10">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                        SUPERHERO <span className="text-blue-400">DATABASE</span>
                    </h1>
                    <p className="text-xs text-gray-400">
                        Compare stats, alignment, and origin details across universe databases.
                    </p>
                </div>

                {/* Filter & Sort Bar */}
                <FilterControls
                    search={search}
                    setSearch={setSearch}
                    alignment={alignment}
                    setAlignment={setAlignment}
                    publisher={publisher}
                    setPublisher={setPublisher}
                    publishers={publishers}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {/* Superhero Cards Grid */}
                {loading ? (
                    <div className="text-center py-20 text-gray-400 text-sm">
                        Loading superhero records...
                    </div>
                ) : paginatedHeroes.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 text-sm">
                        No superheroes found matching your filters.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                            {paginatedHeroes.map((hero) => (
                                <HeroCard
                                    key={hero.id}
                                    hero={hero}
                                    onSelect={setSelectedHero}
                                />
                            ))}
                        </div>

                        {/* Pagination Component */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            pageSize={pageSize}
                            totalItems={sortedHeroes.length}
                            onPageChange={setCurrentPage}
                            onPageSizeChange={handlePageSizeChange}
                        />
                    </>
                )}

                {/* Modal Detail View */}
                <HeroModal
                    hero={selectedHero}
                    onClose={() => setSelectedHero(null)}
                />

            </div>
        </main>
    );
}