import Link from "next/link";
import { Post } from "@/app/blog-project/lib/posts";
import BlogCard from "@/app/blog-project/ui/blog-card";
import LoadingIndicator from "@/app/blog-project/ui/loading-indicator";
import { Suspense } from "react";

function Banner() {
    return (
        <div className="text-center space-y-2 pt-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Welcome to the <span className="text-blue-400">Blog Posting</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
                Explore articles, guides, and tutorials on modern web development.
            </p>
        </div>
    );
}

function NewBlogSection({ newPosts }: { newPosts: Post[] }) {
    return (
        <section className="space-y-6">
            <div className="border-b border-[#3d3c3d] pb-3 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span className="text-blue-400">✨</span> New Blogs
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">Freshly published articles</p>
                </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center list-none p-0">
                {newPosts.map((p) => (
                    <li key={p.slug}>
                        <BlogCard
                            post={p}
                            badge="NEW"
                            badgeStyle="bg-blue-600/80 text-blue-200 border-blue-400/40"
                        />
                    </li>
                ))}
            </ul>

            <div className="flex justify-center pt-2">
                <Link href="/blog-project/blog">
                    <button className="cursor-pointer bg-[#3d3c3d] hover:bg-[#4a4949] px-9 py-3 rounded-xl border border-[#4a4949] shadow-[0px_4px_32px_0_rgba(74,150,225,.70)] text-white font-medium group">
                        <div className="relative overflow-hidden">
                            <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                New
                            </p>
                            <p className="absolute top-9 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                Blog
                            </p>
                        </div>
                    </button>
                </Link>
            </div>
        </section>
    );
}

function FeatureBlogSection({ featuredPosts }: { featuredPosts: Post[] }) {
    return (
        <section className="space-y-6">
            <div className="border-b border-[#3d3c3d] pb-3 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span className="text-amber-400">🔥</span> Featured Blogs
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">Handpicked top reads</p>
                </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center list-none p-0">
                {featuredPosts.map((p) => (
                    <li key={p.slug}>
                        <BlogCard
                            post={p}
                            badge="FEATURED"
                            badgeStyle="bg-amber-600/80 text-amber-200 border-amber-400/40"
                        />
                    </li>
                ))}
            </ul>

            <div className="flex justify-center pt-2">
                <Link href="/blog-project/blog">
                    <button className="cursor-pointer bg-[#3d3c3d] hover:bg-[#4a4949] px-9 py-3 rounded-xl border border-[#4a4949] shadow-[0px_4px_32px_0_rgba(74,150,225,.70)] text-white font-medium group">
                        <div className="relative overflow-hidden">
                            <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                Featured
                            </p>
                            <p className="absolute top-7 left-4 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.2,1,0.2,1)]">
                                Blog
                            </p>
                        </div>
                    </button>
                </Link>
            </div>
        </section>
    );
}

// Separate component that performs the async API fetch
async function BlogContent() {
    const data = await fetch("https://api.vercel.app/blog");
    const rawPosts = await data.json();

    const posts: Post[] = rawPosts.map((p: any) => ({
        ...p,
        slug: p.slug || p.id.toString(),
        category: p.category || p.author || "General",
    }));

    const newPosts = posts.slice(0, 3);
    const featuredPosts = posts.length >= 6 ? posts.slice(3, 6) : posts.slice(0, 3);

    return (
        <div className="space-y-16">
            <NewBlogSection newPosts={newPosts} />
            <FeatureBlogSection featuredPosts={featuredPosts} />
        </div>
    );
}

export default function Home() {
    return (
        <main className="min-h-screen bg-[#1a1a1a] text-white p-6 sm:p-10">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Banner loads immediately without waiting */}
                <Banner />

                {/* Loading indicator shows while BlogContent fetches data */}
                <Suspense fallback={<LoadingIndicator />}>
                    <BlogContent />
                </Suspense>

            </div>
        </main>
    );
}