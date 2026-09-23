import Link from 'next/link';
import { getPost, getPosts } from '@/app/lib/posts';
import LikeButton from "@/app/ui/like-button";

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return (
            <main className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-4">
                <div className="relative drop-shadow-xl max-w-md w-full overflow-hidden rounded-xl bg-[#3d3c3d] p-0.5">
                    <div className="relative z-[1] bg-[#323132] opacity-90 rounded-[10px] p-6 text-center">
                        <h1 className="text-lg font-bold text-red-400">Post Not Found</h1>
                        <Link href="/" className="inline-block mt-4 text-xs font-semibold text-gray-300 hover:text-white uppercase tracking-wider">
                            ← Return to Home
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#1a1a1a] p-4 sm:p-8 flex flex-col items-center justify-center">
            {/* Navigation Header */}
            <div className="w-full max-w-2xl mb-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
                >
                    ← Back to Blog Posts
                </Link>
            </div>

            {/* Article Card styled using your design system */}
            <div className="relative drop-shadow-xl w-full max-w-2xl overflow-hidden rounded-xl bg-[#3d3c3d] p-0.5">
                {/* Ambient Lighting Background Effect */}
                <div className="absolute w-72 h-64 bg-white blur-[60px] -left-1/3 -top-1/3 pointer-events-none z-0" />

                {/* Main Content Area */}
                <div className="relative z-[1] bg-[#323132] opacity-95 rounded-[10px] p-6 sm:p-8 flex flex-col gap-4 text-white">

                    {/* Top Meta Details (Category & Date) */}
                    <div className="flex items-center justify-between border-b border-[#4a4949] pb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-[#1a1a1a]/60 px-2.5 py-1 rounded-md border border-[#4a4949]">
                            {post.category}
                        </span>
                        {post.publishedAt && (
                            <span className="text-xs text-gray-400">
                                {post.publishedAt}
                            </span>
                        )}
                    </div>

                    {/* Article Title */}
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {post.title}
                    </h1>

                    {/* Main Article Body */}
                    <div className="text-gray-300 leading-relaxed text-sm sm:text-base whitespace-pre-line my-2">
                        {post.content}
                    </div>

                    {/* Like Action Footer */}
                    <div className="pt-4 border-t border-[#4a4949] flex items-center justify-between">
                        <LikeButton initialLikes={post.likes} slug={post.slug} />
                    </div>

                </div>
            </div>
        </main>
    );
}