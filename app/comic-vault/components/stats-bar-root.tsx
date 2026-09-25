// app/comic-vault/components/stats-bar.tsx

interface StatsBarProps {
    volumesCount: number;
    episodesCount: number;
    moviesCount: number;
}

export function StatsBarRoot({
                             volumesCount,
                             episodesCount,
                             moviesCount,
                         }: StatsBarProps) {
    return (
        <div className="my-6 overflow-hidden rounded-xl border border-gray-800 bg-gray-900/80 shadow-lg backdrop-blur">
            <div className="grid grid-cols-1 divide-y divide-gray-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                {/* Partition 1: Volumes */}
                <div className="flex flex-col items-center justify-center p-4 text-center transition-colors hover:bg-gray-800/50">
          <span className="text-2xl font-black text-red-500 sm:text-3xl">
            {volumesCount.toLocaleString()}
          </span>
                    <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Total Volumes
          </span>
                </div>

                {/* Partition 2: Episodes */}
                <div className="flex flex-col items-center justify-center p-4 text-center transition-colors hover:bg-gray-800/50">
          <span className="text-2xl font-black text-white sm:text-3xl">
            {episodesCount.toLocaleString()}
          </span>
                    <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Episodes & Seasons
          </span>
                </div>

                {/* Partition 3: Movies */}
                <div className="flex flex-col items-center justify-center p-4 text-center transition-colors hover:bg-gray-800/50">
          <span className="text-2xl font-black text-red-500 sm:text-3xl">
            {moviesCount.toLocaleString()}
          </span>
                    <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Comic Movies
          </span>
                </div>

            </div>
        </div>
    );
}