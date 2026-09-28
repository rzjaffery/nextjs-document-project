'use client';

import { useState } from "react";
import Image from "next/image";
import {Powerstats, Superhero} from "@/app/superhero-database/lib/types";
import BattleSimulatorModal from "@/app/superhero-database/ui/battle-simulator-modal-props";

type CompareModalProps = {
    hero1: Superhero | null;
    hero2: Superhero | null;
    onClose: () => void;
};

const STAT_KEYS: (keyof Powerstats)[] = [
    "intelligence",
    "strength",
    "speed",
    "durability",
    "power",
    "combat",
];

export default function CompareModal({ hero1, hero2, onClose }: CompareModalProps) {
    const [showBattleSim, setShowBattleSim] = useState(false);

    if (!hero1 || !hero2) return null;

    // Calculate total stats
    const total1 = STAT_KEYS.reduce((sum, stat) => sum + (hero1.powerstats[stat] || 0), 0);
    const total2 = STAT_KEYS.reduce((sum, stat) => sum + (hero2.powerstats[stat] || 0), 0);

    const winner = total1 > total2 ? hero1 : total2 > total1 ? hero2 : null;

    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                <div className="relative drop-shadow-2xl w-full max-w-3xl overflow-hidden rounded-xl bg-[#3d3c3d] p-0.5 max-h-[92vh] flex flex-col">
                    <div className="relative z-[1] bg-[#323132] opacity-95 rounded-[10px] p-6 space-y-5 text-white overflow-y-auto">

                        {/* Header & Close Button */}
                        <div className="flex justify-between items-center border-b border-[#4a4949] pb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">📊</span>
                                <h2 className="text-xl font-black uppercase tracking-wider">
                                    1 vs 1 <span className="text-blue-400">Battle Compare</span>
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Hero Cards Banner */}
                        <div className="grid grid-cols-2 gap-4 text-center items-center relative">

                            {/* Hero 1 */}
                            <div className="flex flex-col items-center gap-2 bg-[#1a1a1a] p-3 rounded-lg border border-[#4a4949]">
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-[#4a4949]">
                                    <Image src={hero1.images.md} alt={hero1.name} fill className="object-cover" />
                                </div>
                                <h3 className="font-extrabold text-sm sm:text-base text-white">{hero1.name}</h3>
                                <span className="text-[10px] text-gray-400">{hero1.biography.publisher || "Unknown"}</span>
                                <span className="text-xs font-bold text-blue-400">Total: {total1} pts</span>
                            </div>

                            {/* VS Divider Badge */}
                            <div className="absolute left-1/2 -translate-x-1/2 z-10 bg-blue-500 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-lg border-2 border-[#323132]">
                                VS
                            </div>

                            {/* Hero 2 */}
                            <div className="flex flex-col items-center gap-2 bg-[#1a1a1a] p-3 rounded-lg border border-[#4a4949]">
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-[#4a4949]">
                                    <Image src={hero2.images.md} alt={hero2.name} fill className="object-cover" />
                                </div>
                                <h3 className="font-extrabold text-sm sm:text-base text-white">{hero2.name}</h3>
                                <span className="text-[10px] text-gray-400">{hero2.biography.publisher || "Unknown"}</span>
                                <span className="text-xs font-bold text-blue-400">Total: {total2} pts</span>
                            </div>

                        </div>

                        {/* Overall Winner Announcement */}
                        {winner ? (
                            <div className="text-center py-2 px-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                                🏆 Overall Stat Winner: <strong className="text-emerald-400 text-sm">{winner.name}</strong>
                            </div>
                        ) : (
                            <div className="text-center py-2 px-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                                ⚖️ Perfectly Balanced Matchup (Tie)
                            </div>
                        )}

                        {/* Battle Simulator Launch Trigger */}
                        <div className="flex justify-center pt-1">
                            <button
                                onClick={() => setShowBattleSim(true)}
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-xs shadow-lg transition-all cursor-pointer flex items-center gap-2"
                            >
                                <span>🔥 Launch Automated Battle Simulator</span>
                            </button>
                        </div>

                        {/* Stat-by-Stat Comparisons */}
                        <div className="space-y-3 pt-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 text-center">
                                Powerstats Breakdown
                            </h4>

                            {STAT_KEYS.map((stat) => {
                                const val1 = hero1.powerstats[stat] || 0;
                                const val2 = hero2.powerstats[stat] || 0;

                                const isHero1Better = val1 > val2;
                                const isHero2Better = val2 > val1;

                                return (
                                    <div key={stat} className="space-y-1 bg-[#1a1a1a] p-3 rounded-lg border border-[#4a4949]">
                                        {/* Stat Title & Values */}
                                        <div className="flex justify-between items-center text-xs font-bold capitalize">
                                            <span className={isHero1Better ? "text-emerald-400 font-extrabold" : "text-gray-300"}>
                                                {val1} {isHero1Better && "👑"}
                                            </span>
                                            <span className="text-gray-400 uppercase text-[11px] font-extrabold tracking-wider">
                                                {stat}
                                            </span>
                                            <span className={isHero2Better ? "text-emerald-400 font-extrabold" : "text-gray-300"}>
                                                {isHero2Better && "👑"} {val2}
                                            </span>
                                        </div>

                                        {/* Dual Side-by-Side Progress Bars */}
                                        <div className="grid grid-cols-2 gap-2 pt-1">
                                            {/* Hero 1 Bar (Fills Right-to-Left) */}
                                            <div className="w-full h-2 bg-[#323132] rounded-full overflow-hidden flex justify-end">
                                                <div
                                                    className={`h-full transition-all duration-500 rounded-full ${
                                                        isHero1Better ? "bg-emerald-500" : "bg-blue-500/60"
                                                    }`}
                                                    style={{ width: `${val1}%` }}
                                                />
                                            </div>

                                            {/* Hero 2 Bar (Fills Left-to-Right) */}
                                            <div className="w-full h-2 bg-[#323132] rounded-full overflow-hidden flex justify-start">
                                                <div
                                                    className={`h-full transition-all duration-500 rounded-full ${
                                                        isHero2Better ? "bg-emerald-500" : "bg-blue-500/60"
                                                    }`}
                                                    style={{ width: `${val2}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </div>

            {/* Battle Simulator Overlay Modal */}
            {showBattleSim && (
                <BattleSimulatorModal
                    hero1={hero1}
                    hero2={hero2}
                    onClose={() => setShowBattleSim(false)}
                />
            )}
        </>
    );
}