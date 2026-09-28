'use client'

import Link from "next/link";

export default function NavbarSuperhero() {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-[#4a4949] bg-[$1a1a1a] backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#323132] hover:bg-[#3d3c3d] text-gray-300 hover:text-white border border-[#4a4949] hover:border-blue-500/50 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                        <span>ROOT</span>
                    </Link>
                </div>

                {/* Logo / Root Link */}
                <Link href="/superhero-database/app" className="flex items-center gap-2 group">
                    <span className="text-xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
                        SUPERHERO DB
                    </span>
                </Link>

                {/* Root Navigation Button */}

            </div>

        </header>
    )
}