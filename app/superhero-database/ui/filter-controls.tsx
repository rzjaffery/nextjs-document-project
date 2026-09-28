'use client'

import {FilterControlsProps} from "@/app/superhero-database/lib/types";

export default function FilterControls({
    search,
    setSearch,
    alignment,
    setAlignment,
    publisher,
    setPublisher,
    publishers,
    sortBy,
    setSortBy,}: FilterControlsProps) {
    return (
        <div className="relative drop-shadow-xl overflow-hidden rounded-xl bg-[#3d3c3d] p-0.5 max-w-4xl mx-auto w-full mb-8">
            <div className="relative z-[1] bg-[#323132] opacity-95 rounded-[10px] p-4 flex flex-col md:flex-row gap-4 items-center justify-between">

                {/* Search Input */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search superhero..."
                    className="w-full md:w-64 px-3 py-2 rounded-lg bg-[#1a1a1a] border border-[#4a4949] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />

                <div className="flex flex-wrap gap-3 w-full md:w-auto">

                    {/*Sort Dropdown*/}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-[#1a1a1a] border border-[#4a4949] text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                        <option value="name-asc">Sort: Name (A–Z)</option>
                        <option value="name-desc">Sort: Name (Z–A)</option>
                        <option value="intelligence">Sort: Highest Intelligence</option>
                        <option value="strength">Sort: Highest Strength</option>
                        <option value="power">Sort: Highest Power</option>
                        <option value="totalPower">Sort: Highest Total Stats</option>

                    </select>

                    {/* Alignment Filter */}
                    <select
                        value={alignment}
                        onChange={(e) => setAlignment(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-[#1a1a1a] border border-[#4a4949] text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">All Alignments</option>
                        <option value="good">Good Heroes</option>
                        <option value="bad">Villains</option>
                        <option value="neutral">Neutral</option>
                    </select>

                    {/* Publisher Filter */}
                    <select
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-[#1a1a1a] border border-[#4a4949] text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">All Publishers</option>
                        {publishers.map((pub) => (
                            <option key={pub} value={pub}>
                                {pub}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    )
}
