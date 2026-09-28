'use client'

import {PaginationProps} from "@/app/superhero-database/lib/types";

export default function Pagination({
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [12,24,36,48,96]}:PaginationProps) {
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return(
        <div className="relative drop-shadow-xl overflow-hidden rounded-xl bg-[#3d3c3d] p-0.5 max-w-6xl mx-auto w-full mt-8">
            <div className="relative z-[1] bg-[#323132] opacity-95 rounded-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* Cards Per Page Dropdown & Item Counter */}
                <div className="flex items-center gap-4 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">Cards per page:</span>
                        <select
                            value={pageSize}
                            onChange={(e) => onPageSizeChange(Number(e.target.value))}
                            className="px-2.5 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#4a4949] text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                            {pageSizeOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <span className="hidden sm:inline border-r border-[#4a4949] h-4" />

                    <span className="text-gray-400">
                        Showing <strong className="text-white">{startItem}–{endItem}</strong> of <strong className="text-white">{totalItems}</strong>
                    </span>
                </div>

                {/* Page Navigation Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#4a4949] text-xs text-white disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:bg-[#3d3c3d] hover:not-disabled:border-blue-500/50 transition-all cursor-pointer"
                    >
                        ◀ Prev
                    </button>

                    <span className="text-xs text-gray-300 px-2 font-medium">
                        Page <strong className="text-blue-400">{currentPage}</strong> of <strong className="text-white">{Math.max(totalPages, 1)}</strong>
                    </span>

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages || totalPages === 0}
                        className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#4a4949] text-xs text-white disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:bg-[#3d3c3d] hover:not-disabled:border-blue-500/50 transition-all cursor-pointer"
                    >
                        Next ▶
                    </button>
                </div>

            </div>
        </div>
    )
}