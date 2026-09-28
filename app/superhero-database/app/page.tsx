'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import {Superhero} from "@/app/superhero-database/lib/types";
import {fetchSuperheroes} from "@/app/superhero-database/lib/superheroes";
import FilterControls from "@/app/superhero-database/ui/filter-controls";
import HeroCard from "@/app/superhero-database/ui/hero-card";
import Pagination from "@/app/superhero-database/ui/pagination";
import HeroModal from "@/app/superhero-database/ui/hero-modal";
import BattleSimulatorModal from "@/app/superhero-database/ui/battle-simulator-modal-props";
import CompareModal from "@/app/superhero-database/ui/compare-modal";

export default function Home() {
    const [heroes, setHeroes] = useState<Superhero[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [alignment, setAlignment] = useState("all");
    const [publisher, setPublisher] = useState("all");
    const [sortBy, setSortBy] = useState("name-asc");
    const [selectedHero, setSelectedHero] = useState<Superhero | null>(null);
    const [mounted, setMounted] = useState(false);

    // Compare & Battle States
    const [compareList, setCompareList] = useState<Superhero[]>([]);
    const [showCompareModal, setShowCompareModal] = useState(false);
    // 2. ADD STATE FOR BATTLE SIMULATOR
    const [showBattleModal, setShowBattleModal] = useState(false);

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

    useEffect(() => {
        setCurrentPage(1);
    }, [search, alignment, publisher, sortBy]);

    if (!mounted) return null;

    // Toggle Compare Item (Max 2)
    const handleToggleCompare = (hero: Superhero) => {
        setCompareList((prev) => {
            const exists = prev.some((h) => h.id === hero.id);
            if (exists) {
                return prev.filter((h) => h.id !== hero.id);
            }
            if (prev.length >= 2) {
                return [prev[1], hero];
            }
            return [...prev, hero];
        });
    };

    // Quick Random Battle Button Helper
    const handleQuickRandomBattle = () => {
        if (heroes.length < 2) return;
        const random1 = heroes[Math.floor(Math.random() * heroes.length)];
        let random2 = heroes[Math.floor(Math.random() * heroes.length)];
        while (random2.id === random1.id) {
            random2 = heroes[Math.floor(Math.random() * heroes.length)];
        }
        setCompareList([random1, random2]);
        setShowBattleModal(true);
    };

    const publishers = Array.from(
        new Set(heroes.map((h) => h.biography.publisher).filter(Boolean))
    ).slice(0, 15) as string[];

    const filteredHeroes = heroes.filter((hero) => {
        const matchesSearch = hero.name.toLowerCase().includes(search.toLowerCase());
        const matchesAlignment = alignment === "all" || hero.biography.alignment === alignment;
        const matchesPublisher = publisher === "all" || hero.biography.publisher === publisher;
        return matchesSearch && matchesAlignment && matchesPublisher;
    });

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

    const totalPages = Math.ceil(sortedHeroes.length / pageSize);
    const paginatedHeroes = sortedHeroes.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <main className="min-h-screen bg-[#1a1a1a] text-white p-6 sm:p-10 pb-28">
            <div className="max-w-6xl mx-auto">

                {/* Header with Quick Random Matchup Button */}
                <div className="text-center space-y-2 mb-8 relative">
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                        SUPERHERO <span className="text-blue-400">DATABASE</span>
                    </h1>
                    <p className="text-xs text-gray-400 max-w-md mx-auto">
                        Compare stats, alignment, and origin details or simulate automated 1v1 fights.
                    </p>

                    {/* 3. OPTIONAL QUICK BATTLE BUTTON IN HEADER */}
                    <div className="pt-2">
                        <button
                            onClick={handleQuickRandomBattle}
                            disabled={loading || heroes.length < 2}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:opacity-90 text-white font-black text-xs shadow-lg transition-all cursor-pointer inline-flex items-center gap-1.5"
                        >
                            <span>🎲 Quick Random Matchup Battle</span>
                        </button>
                    </div>
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
                                    isCompared={compareList.some((h) => h.id === hero.id)}
                                    onToggleCompare={handleToggleCompare}
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
                            onPageSizeChange={(size) => {
                                setPageSize(size);
                                setCurrentPage(1);
                            }}
                        />
                    </>
                )}

                {/* Single Hero Modal */}
                <HeroModal
                    hero={selectedHero}
                    onClose={() => setSelectedHero(null)}
                />

                {/* Side-by-Side Stats Comparison Modal */}
                {showCompareModal && (
                    <CompareModal
                        hero1={compareList[0] || null}
                        hero2={compareList[1] || null}
                        onClose={() => setShowCompareModal(false)}
                    />
                )}

                {/* 4. RENDER BATTLE SIMULATOR MODAL */}
                {showBattleModal && compareList.length === 2 && (
                    <BattleSimulatorModal
                        hero1={compareList[0]}
                        hero2={compareList[1]}
                        onClose={() => setShowBattleModal(false)}
                    />
                )}

            </div>

            {/* 5. STICKY BOTTOM FLOATING DOCK WITH BATTLE BUTTON */}
            {compareList.length > 0 && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#323132]/95 border border-[#4a4949] backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl flex flex-wrap items-center justify-center gap-4 text-xs">

                    {/* Selected Hero Chips */}
                    <div className="flex items-center gap-2">
                        {compareList.map((hero) => (
                            <div key={hero.id} className="flex items-center gap-2 bg-[#1a1a1a] px-2.5 py-1 rounded-lg border border-[#4a4949]">
                                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#4a4949]">
                                    <Image src={hero.images.sm} alt={hero.name} fill className="object-cover" />
                                </div>
                                <span className="font-bold text-white text-[11px] truncate max-w-[90px]">{hero.name}</span>
                                <button
                                    onClick={() => handleToggleCompare(hero)}
                                    className="text-gray-400 hover:text-rose-400 ml-1 font-bold"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        {compareList.length === 1 && (
                            <span className="text-gray-400 text-[11px] italic px-2">
                                Select 1 more hero...
                            </span>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 border-l border-[#4a4949] pl-3">
                        {/* Compare Stats Button */}
                        <button
                            onClick={() => setShowCompareModal(true)}
                            disabled={compareList.length < 2}
                            className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                            <span>📊 Compare Stats</span>
                        </button>

                        {/* Simulate Battle Button */}
                        <button
                            onClick={() => setShowBattleModal(true)}
                            disabled={compareList.length < 2}
                            className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                            <span>🔥 Simulate Battle</span>
                        </button>

                        <button
                            onClick={() => setCompareList([])}
                            className="text-gray-400 hover:text-white px-2 py-1 text-[11px] underline"
                        >
                            Clear
                        </button>
                    </div>

                </div>
            )}
        </main>
    );
}