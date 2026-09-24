import Link from "next/link";

type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    date?: string;
    category?: string;
    slug?: string;
    publishedAt?: string;
};

function blogList(posts: Post[]) {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center max-w-4xl mx-auto list-none p-0">
            {posts.map((p) => {
                // Fallback to p.id if p.slug is undefined
                const postId = p.slug || p.id;
                const category = p.category || p.author || "General";
                const date = p.date || p.publishedAt;

                return (
                    <li key={postId}>
                        <Link href={`/blog/${postId}`} className="block group">
                            <div className="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d] transition-transform duration-200 group-hover:scale-105">
                                <div className="absolute flex flex-col items-center justify-center text-center p-4 text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
                                    <span className="font-bold text-base line-clamp-3">{p.title}</span>
                                    <span className="text-xs text-gray-400 mt-2 uppercase tracking-wider">{category}</span>
                                    {date && (
                                        <span className="text-[10px] text-gray-500 mt-1">{date}</span>
                                    )}
                                </div>
                                <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2 pointer-events-none"></div>
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default async function BlogIndexPage() {
    const data = await fetch('https://api.vercel.app/blog');
    const posts: Post[] = await data.json();

    return (
        <main className="min-h-screen bg-[#1a1a1a] p-6">
            {blogList(posts)}
        </main>
    );
}