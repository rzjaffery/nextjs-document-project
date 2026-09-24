'use client'

import { useState, useEffect } from "react";

type LikeButtonProps = {
    initialLikes: number;
    slug: string; // Unique identifier for each post
};

export default function LikeButton({ initialLikes, slug }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(false);

    // Read saved state from localStorage when the component loads on the client
    useEffect(() => {
        const storedLikes = localStorage.getItem(`likes_${slug}`);
        const storedHasLiked = localStorage.getItem(`hasLiked_${slug}`);

        if (storedLikes !== null) {
            setLikes(Number(storedLikes));
        }
        if (storedHasLiked !== null) {
            setHasLiked(storedHasLiked === 'true');
        }
    }, [slug]);

    const handleLike = () => {
        let newLikes = likes;
        let newHasLiked = !hasLiked;

        if (hasLiked) {
            newLikes -= 1; // Toggle off like
        } else {
            newLikes += 1; // Toggle on like
        }

        setLikes(newLikes);
        setHasLiked(newHasLiked);

        // Save updated state to browser storage
        localStorage.setItem(`likes_${slug}`, newLikes.toString());
        localStorage.setItem(`hasLiked_${slug}`, newHasLiked.toString());
    };

    return (
        <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider transition-all duration-200 border ${
                hasLiked
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-[#1a1a1a]/80 border-[#4a4949] text-gray-300 hover:text-white hover:border-gray-400'
            }`}
        >
            <span>{hasLiked ? '👍 Liked' : '👍 Like'}</span>
            <span className="px-2 py-0.5 rounded bg-black/30 font-bold text-white">
                {likes}
            </span>
        </button>
    );
}