// app/page.tsx

import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-12 text-white">
            <div className="w-full max-w-3xl text-center">

                {/* Hub Header */}
                <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gray-400 border border-gray-800">
                    Project Hub
                </span>

                <h1 className="mt-4 text-3xl font-black uppercase tracking-wider sm:text-5xl">
                    Select A <span className="text-red-600">Portal</span>
                </h1>

                <p className="mt-3 text-sm text-gray-400 sm:text-base">
                    Choose an application below to start exploring.
                </p>

                {/* Centered Interactive Portal Buttons */}
                <div className="mt-10 flex flex-col justify-center gap-6 sm:flex-row">

                    {/* Blog Website Portal */}
                    <Link href="/blog-project" className="group w-full sm:w-1/2">
                        <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-gray-900 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                            <div className="flex items-center justify-between">
                                <span className="rounded bg-blue-500/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-400 border border-blue-500/20">
                                    Blog Portal
                                </span>
                                <span className="text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-400">
                                    →
                                </span>
                            </div>
                            <h2 className="mt-5 text-xl font-bold text-white group-hover:text-blue-400">
                                Blog Website
                            </h2>
                            <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                                Explore published articles, tech documentation, and guides.
                            </p>
                        </div>
                    </Link>

                    {/* Comic Vault Portal */}
                    <Link href="/comic-vault" className="group w-full sm:w-1/2">
                        <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-red-600 hover:bg-gray-900 hover:shadow-[0_0_30px_rgba(220,38,38,0.35)]">
                            <div className="flex items-center justify-between">
                                <span className="rounded bg-red-600/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-red-500 border border-red-600/20">
                                    Comic Vault
                                </span>
                                <span className="text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-red-500">
                                    →
                                </span>
                            </div>
                            <h2 className="mt-5 text-xl font-bold text-white group-hover:text-red-500">
                                Comic Vault
                            </h2>
                            <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                                Search comic issues, character rosters, and series catalog metrics.
                            </p>
                        </div>
                    </Link>

                </div>
            </div>
        </main>
    );
}