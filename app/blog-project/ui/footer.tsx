'use client'

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail("");
        }
    };

    return (
        <footer className="w-full bg-[#1a1a1a] border-t border-[#4a4949] text-white py-10 px-4 mt-auto">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Left Side: Brand & Quick Links */}
                <div className="flex flex-col gap-3 text-center md:text-left">
                    <span className="font-bold text-lg text-white">Developer Blog</span>
                    <p className="text-xs text-gray-400 max-w-xs">
                        Tutorials, tech articles, and insights delivered straight to your inbox.
                    </p>

                    {/* Navigation Links */}
                    <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold text-gray-400 pt-1">
                        <Link href="/public" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span>•</span>
                        <Link href="/blog-project/blog" className="hover:text-white transition-colors">
                            Blog
                        </Link>
                        <span>•</span>
                        <Link href="/about" className="hover:text-white transition-colors">
                            About
                        </Link>
                    </div>
                </div>

                {/* Right Side: Small Subscription Form Card */}
                <div className="relative drop-shadow-xl overflow-hidden rounded-xl bg-[#3d3c3d] p-0.5 w-full md:w-80">
                    <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2 pointer-events-none" />
                    <div className="relative z-[1] bg-[#323132] opacity-95 rounded-[10px] p-5 text-center space-y-2">
                        <h3 className="text-sm font-bold text-white">Stay Updated</h3>
                        <p className="text-[11px] text-gray-400">
                            Get notified when new articles are published.
                        </p>

                        {subscribed ? (
                            <p className="text-xs font-semibold text-green-400 pt-2">
                                ✓ Thanks for subscribing!
                            </p>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email..."
                                    className="w-full px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#4a4949] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shrink-0"
                                >
                                    Join
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </div>

            {/* Bottom Copyright Line */}
            <div className="max-w-4xl mx-auto border-t border-[#323132] mt-8 pt-4 text-center text-[11px] text-gray-500">
                © {new Date().getFullYear()} All rights reserved.
            </div>
        </footer>
    );
}