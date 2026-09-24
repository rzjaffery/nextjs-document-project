import Link from "next/link";

export default function Navbar() {
    return (
        <header className="border-b border-[#4a4949] bg-[#323132]/80 backdrop-blur-md sticky top-0 z-40">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link
                    href="/public"
                    className="text-sm font-extrabold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors"
                >
                    📰 Developer Blog
                </Link>
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-300">
                    <Link href="/blog-project/blog" className="hover:text-white transition-colors">
                        All Articles
                    </Link>
                    <span className="text-gray-600">•</span>
                    <Link href="/public" className="hover:text-white transition-colors">
                        Home
                    </Link>
                </div>
            </div>
        </header>
    )
}