'use client'

import {HeroModalProps} from "@/app/superhero-database/lib/types";
import Image from "next/image";

export default function HeroModal({hero, onClose}:HeroModalProps){
    if (!hero) return null;

    const stats = Object.entries(hero.powerstats)

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative drop-shadow-2xl w-full max-w-lg overflow-hidden rounded-xl bg-[#3d3c3d] p-0.5">
                <div className="absolute w-72 h-64 bg-white blur-[60px] -left-1/3 -top-1/3 pointer-events-none" />

                <div className="relative z-1 bg-[#323132] opacity-95 rounded-[10px] p-6 space-y-5 text-white max-h-[90vh] overflow-y-auto">

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg font-bold"
                    >
                        ✕
                    </button>

                    {/* Hero Header */}
                    <div className="flex items-center gap-4 border-b border-[#4a4949] pb-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#4a4949] shrink-0">
                            <Image src={hero.images.md} alt={hero.name} fill className="object-cover" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white">{hero.name}</h2>
                            <p className="text-xs text-blue-400">{hero.biography.fullName || hero.name}</p>
                            <p className="text-[11px] text-gray-400">{hero.biography.publisher}</p>
                        </div>
                    </div>

                    {/* Powerstats Progress Bars */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Powerstats</h4>
                        {stats.map(([stat, val]) => (
                            <div key={stat} className="space-y-1">
                                <div className="flex justify-between text-xs capitalize">
                                    <span className="text-gray-400">{stat}</span>
                                    <span className="font-bold">{val}</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#4a4949]">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                        style={{ width: `${val}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bio details */}
                    <div className="border-t border-[#4a4949] pt-3 text-xs text-gray-300 space-y-1">
                        <p><strong className="text-white">First Appearance:</strong> {hero.biography.firstAppearance}</p>
                        <p><strong className="text-white">Race:</strong> {hero.appearance.race || "N/A"}</p>
                        <p><strong className="text-white">Height:</strong> {hero.appearance.height[1] || hero.appearance.height[0]}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
