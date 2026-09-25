// app/comic-vault/components/character-carousel.tsx
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ComicVineCharacterCredit } from '../lib/types';

interface CharacterCarouselProps {
    characters: ComicVineCharacterCredit[];
}

export function CharacterCarousel({ characters }: CharacterCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!characters || characters.length === 0) {
        return (
            <div className="mt-8 border-t border-gray-800 pt-6">
                <h2 className="text-xl font-bold text-red-500">Characters</h2>
                <p className="mt-2 text-sm text-gray-400">No character information available for this issue.</p>
            </div>
        );
    }

    return (
        <div className="mt-8 border-t border-gray-800 pt-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-red-500">
                    Featured Characters ({characters.length})
                </h2>

                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 bg-gray-900 text-white transition hover:border-red-500 hover:bg-red-600"
                        aria-label="Scroll left"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 bg-gray-900 text-white transition hover:border-red-500 hover:bg-red-600"
                        aria-label="Scroll right"
                    >
                        →
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {characters.map((character) => {
                    const imageUrl =
                        character.image?.medium_url ||
                        character.image?.icon_url
                        // character.image?.small_url;

                    return (
                        <div
                            key={character.id}
                            className="flex w-[calc(50%-8px)] flex-shrink-0 snap-start flex-col items-center overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-3 sm:w-[calc(33.33%-11px)] lg:w-[calc(20%-13px)]"
                        >
                            <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-950 flex items-center justify-center">
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={character.name}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 20vw"
                                        className="object-cover"
                                    />
                                ) : (
                                    /* Fallback when no image is available */
                                    <div className="flex h-full w-full items-center justify-center bg-gray-800 text-2xl font-bold text-red-500">
                                        {character.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <h3 className="mt-3 text-center text-xs font-semibold text-white line-clamp-1">
                                {character.name}
                            </h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}