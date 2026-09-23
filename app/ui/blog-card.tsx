import Link from "next/link";

export default function BlogCard({
                      post,
                      badge,
                      badgeStyle
                  }: {
    post: { slug: string; title: string; category: string, publishedAt: string };
    badge?: string;
    badgeStyle?: string
}) {
    return (
        <Link href={`/blog/${post.slug}`} className="block group">
            <div className="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d] transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-black/60">
                <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute flex flex-col justify-between items-center text-center p-4 text-white z-[1] opacity-95 rounded-xl inset-0.5 bg-[#323132] group-hover:bg-[#2b2a2b] transition-colors duration-200">
                    <div className="w-full flex justify-end">
                        {badge && (
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border backdrop-blur-md tracking-wider uppercase ${badgeStyle}`}>
                                {badge}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col items-center gap-1.5 my-auto px-1">
                        <span className="font-bold text-sm sm:text-base leading-snug text-white group-hover:text-blue-300 transition-colors line-clamp-3">
                            {post.title}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                            {post.category}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                            {post.publishedAt}
                        </span>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-400 group-hover:text-white transition-colors flex items-center gap-1">
                        Read More <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}