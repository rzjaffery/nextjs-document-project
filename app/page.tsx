import Image from "next/image";
import Link from "next/link";
import LoadingIndicator from "@/app/ui/loading-indicator";
import { getPosts } from "@/app/lib/posts";

export default async function Home() {
    const posts = await getPosts();

    return (
        <main className="min-h-screen bg-[#1a1a1a] p-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center max-w-4xl mx-auto list-none p-0">
                {posts.map((p) => (
                    <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`} className="block group">
                            {/*<LoadingIndicator />*/}
                            <div className="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d] transition-transform duration-200 group-hover:scale-105">
                                <div className="absolute flex flex-col items-center justify-center text-center p-4 text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
                                    <span className="font-bold text-base">{p.title}</span>
                                    <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{p.category}</span>
                                </div>
                                <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2 pointer-events-none"></div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}