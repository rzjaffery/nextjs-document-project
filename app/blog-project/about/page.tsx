import Link from "next/link";

export const metadata = {
    title: "About | Developer Journal",
    description: "Learn more about our mission, topics, and technical background.",
};

export default function AboutPage() {
    const topics = [
        {
            icon: "⚡",
            title: "Frontend Engineering",
            description: "Deep dives into React, Next.js App Router, Tailwind CSS, and modern UI/UX design patterns."
        },
        {
            icon: "🛠️",
            title: "Backend & APIs",
            description: "Building scalable Node.js services, database design, REST APIs, and serverless architectures."
        },
        {
            icon: "🚀",
            title: "DevOps & Tooling",
            description: "Automation, CI/CD pipelines, Docker, Vercel deployments, and web performance optimization."
        }
    ];

    return (
        <main className="min-h-screen bg-[#1a1a1a] text-white p-6 sm:p-10">
            <div className="max-w-4xl mx-auto space-y-10">

                {/* Top Navigation */}
                <div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Hero Mission Card */}
                <div className="relative drop-shadow-xl overflow-hidden rounded-xl bg-[#3d3c3d] p-0.5">
                    <div className="absolute w-72 h-64 bg-white blur-[60px] -left-1/3 -top-1/3 pointer-events-none" />

                    <div className="relative z-[1] bg-[#323132] opacity-95 rounded-[10px] p-6 sm:p-10 space-y-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-[#1a1a1a]/60 px-3 py-1 rounded-md border border-[#4a4949]">
                            About The Blog
                        </span>

                        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Building & Sharing for the <span className="text-blue-400">Modern Web</span>
                        </h1>

                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            Welcome to the Developer Journal! This platform was built as a hands-on space to share practical tutorials, real-world coding challenges, and lessons learned while crafting modern web applications.
                        </p>
                    </div>
                </div>

                {/* What We Cover Grid */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span>🎯</span> What We Cover
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {topics.map((item) => (
                            <div key={item.title} className="relative drop-shadow-xl overflow-hidden rounded-xl bg-[#3d3c3d] p-0.5">
                                <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2 pointer-events-none opacity-60" />

                                <div className="relative z-[1] bg-[#323132] opacity-95 rounded-[10px] p-5 h-full flex flex-col justify-between space-y-3">
                                    <div className="space-y-2">
                                        <div className="text-2xl">{item.icon}</div>
                                        <h3 className="font-bold text-sm text-white">{item.title}</h3>
                                        <p className="text-xs text-gray-400 leading-normal">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Author / Tech Stack Info Card */}
                <div className="relative drop-shadow-xl overflow-hidden rounded-xl bg-[#3d3c3d] p-0.5">
                    <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2 pointer-events-none opacity-60" />

                    <div className="relative z-[1] bg-[#323132] opacity-95 rounded-[10px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="space-y-1 text-center sm:text-left">
                            <h3 className="text-lg font-bold text-white">Built with Modern Tech</h3>
                            <p className="text-xs text-gray-400">
                                Next.js App Router • Tailwind CSS • TypeScript • React Server Components
                            </p>
                        </div>

                        <Link
                            href="/blog-project/blog"
                            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all duration-200 shrink-0 shadow-lg shadow-blue-600/20"
                        >
                            Read Blog Posts →
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}