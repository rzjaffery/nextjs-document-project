'use client';

import Image from "next/image";
import {HeroCardProps} from "@/app/superhero-database/lib/types";


export default function HeroCard({ hero, onSelect }: HeroCardProps) {
    const alignmentColor =
        hero.biography.alignment === "good" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" :
            hero.biography.alignment === "bad" ? "bg-rose-500/20 text-rose-300 border-rose-500/40" :
                "bg-amber-500/20 text-amber-300 border-amber-500/40";

    return (
        <div
            onClick={() => onSelect(hero)}
            className="cursor-pointer group relative drop-shadow-xl w-60 h-80 overflow-hidden rounded-xl bg-[#3d3c3d] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/70"
        >
            <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="absolute inset-0.5 z-[1] bg-[#323132] opacity-95 rounded-[10px] p-3 flex flex-col justify-between">

                {/* Hero Image */}
                <div className="relative w-full h-44 rounded-lg overflow-hidden border border-[#4a4949]">
                    <Image
                        src={hero.images.md}
                        alt={hero.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 240px"
                        className="object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className={`absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-md ${alignmentColor}`}>
                        {hero.biography.alignment}
                    </span>
                </div>

                {/* Hero Details */}
                <div className="flex flex-col gap-1 text-center mt-2">
                    <h3 className="font-extrabold text-white text-base truncate group-hover:text-blue-400 transition-colors">
                        {hero.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 truncate">
                        {hero.biography.publisher || "Unknown Publisher"}
                    </p>
                </div>

                {/* Stat Preview Bar */}
                <div className="grid grid-cols-2 gap-1 pt-2 border-t border-[#4a4949] text-[10px] text-gray-300">
                    <div>🧠 INT: <span className="font-bold text-white">{hero.powerstats.intelligence}</span></div>
                    <div>💪 STR: <span className="font-bold text-white">{hero.powerstats.strength}</span></div>
                </div>

            </div>
        </div>
    );
}