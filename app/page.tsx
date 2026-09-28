import Link from "next/link";

// 1. Scalable Portal Configuration Array
type Portal = {
    id: string;
    title: string;
    description: string;
    href: string;
    tag: string;
    status: "Active" | "Beta" | "Updating";
    icon: string;
    // Tailored color themes for each portal card
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    hoverBorder: string;
    hoverGlow: string;
};

const PORTALS: Portal[] = [
    {
        id: "blog",
        title: "Blog Website",
        description: "Explore published articles, tech documentation, and comprehensive developer guides.",
        href: "/blog-project",
        tag: "Publication",
        status: "Active",
        icon: "📝",
        badgeBg: "bg-blue-500/10",
        badgeText: "text-blue-400",
        badgeBorder: "border-blue-500/20",
        hoverBorder: "hover:border-blue-500",
        hoverGlow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
    },
    {
        id: "comic-vault",
        title: "Comic Vault",
        description: "Search comic issues, character rosters, and series catalog metrics across publishers.",
        href: "/comic-vault",
        tag: "Archive",
        status: "Active",
        icon: "📚",
        badgeBg: "bg-red-500/10",
        badgeText: "text-red-400",
        badgeBorder: "border-red-500/20",
        hoverBorder: "hover:border-red-500",
        hoverGlow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]",
    },
    {
        id: "superhero-db",
        title: "SuperHero Database",
        description: "Compare powerstats, alignment, and origin details across universe databases.",
        href: "/superhero-database/app",
        tag: "Database",
        status: "Beta",
        icon: "⚡",
        badgeBg: "bg-orange-500/10",
        badgeText: "text-orange-400",
        badgeBorder: "border-orange-500/20",
        hoverBorder: "hover:border-orange-500",
        hoverGlow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-between relative overflow-hidden font-sans">

            {/* Background Ambient Glow & Grid Lines */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-600/15 via-red-600/10 to-transparent blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* 2. Minimal Top Header Bar */}
            <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-gray-900">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                    <span className="font-black tracking-widest text-sm uppercase text-gray-200">
            VAULSYS <span className="text-red-500">HUB</span>
          </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-900/80 px-3 py-1.5 rounded-full border border-gray-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>All Portals Operational</span>
                </div>
            </header>

            {/* Main Hero & Portals Area */}
            <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 my-auto w-full">

                {/* Hub Title Banner */}
                <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="inline-block rounded-full bg-gray-900/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-gray-400 border border-gray-800">
            CENTRAL GATEWAY
          </span>

                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase">
                        Select A <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-blue-500">Portal</span>
                    </h1>

                    <p className="text-sm sm:text-base text-gray-400">
                        Access multi-universe applications, databases, and publication catalogs from a single launcher.
                    </p>
                </div>

                {/* 3. Auto-Responsive CSS Grid (Handles 3, 6, or 9 Portals) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PORTALS.map((portal) => (
                        <Link key={portal.id} href={portal.href} className="group">
                            <div
                                className={`h-full relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${portal.hoverBorder} ${portal.hoverGlow}`}
                            >
                                <div>
                                    {/* Card Header Tag & Icon */}
                                    <div className="flex items-center justify-between mb-4">
                    <span className={`rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider border ${portal.badgeBg} ${portal.badgeText} ${portal.badgeBorder}`}>
                      {portal.tag}
                    </span>
                                        <span className="text-xl group-hover:scale-125 transition-transform duration-300">
                      {portal.icon}
                    </span>
                                    </div>

                                    {/* Card Title & Description */}
                                    <h2 className="text-xl font-extrabold text-white group-hover:text-gray-100 transition-colors flex items-center justify-between">
                                        <span>{portal.title}</span>
                                        <span className="text-gray-600 group-hover:text-white group-hover:translate-x-1.5 transition-all text-lg">
                      →
                    </span>
                                    </h2>

                                    <p className="mt-2.5 text-xs text-gray-400 leading-relaxed">
                                        {portal.description}
                                    </p>
                                </div>

                                {/* Card Footer Status */}
                                <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-[10px] text-gray-500">
                                    <span>Status: <strong className="text-emerald-400 font-medium">{portal.status}</strong></span>
                                    <span className="group-hover:underline">Launch App</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </main>

            {/* 4. Minimal Footer */}
            <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2">
                <p>© {new Date().getFullYear()} Project Hub. All portals integrated.</p>
                <p>Active Portals: <span className="text-white font-bold">{PORTALS.length}</span></p>
            </footer>

        </div>
    );
}