// app/comic-vault/components/character-grid.tsx

import { ComicVineCharacterCredit } from '../lib/types';

interface CharacterGridProps {
    characters: ComicVineCharacterCredit[];
}

export function CharacterGrid({ characters }: CharacterGridProps) {
    if (!characters || characters.length === 0) {
        return (
            <div className="mt-8 border-t border-gray-800 pt-6">
                <h2 className="text-xl font-bold text-red-500">Featured Characters</h2>
                <p className="mt-2 text-sm text-gray-400">
                    No character credits listed for this issue.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 border-t border-gray-800 pt-6">
            <h2 className="mb-4 text-xl font-bold text-red-500">
                Featured Characters ({characters.length})
            </h2>

            {/* Wrapping grid of compact character badges */}
            <div className="flex flex-wrap gap-2.5">
                {characters.map((character) => (
                    <div
                        key={character.id}
                        className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-3.5 py-2 text-xs font-medium text-gray-200 transition-colors hover:border-red-600 hover:bg-gray-800 hover:text-white sm:text-sm"
                    >
                        {/* Red visual dot accent */}
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        <span>{character.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}