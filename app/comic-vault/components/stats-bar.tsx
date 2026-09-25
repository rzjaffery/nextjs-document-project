// app/comic-vault/components/stats-bar.tsx

interface StatsBarProps {
    issueNumber: string;
    totalSeriesIssues: number;
    storyArcsCount: number;
}

export function StatsBar({
                             issueNumber,
                             totalSeriesIssues,
                             storyArcsCount,
                         }: StatsBarProps) {
    return (
        <div className="my-6 overflow-hidden rounded-xl border border-gray-800 bg-gray-900/80 shadow-lg backdrop-blur">
            <div className="grid grid-cols-1 divide-y divide-gray-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                {/* Issue Number */}
                <div className="flex flex-col items-center justify-center p-4 text-center transition-colors hover:bg-gray-800/50">
          <span className="text-2xl font-black text-red-500 sm:text-3xl">
            #{issueNumber || '1'}
          </span>
                    <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Issue Number
          </span>
                </div>

                {/* Total Issues in Series */}
                <div className="flex flex-col items-center justify-center p-4 text-center transition-colors hover:bg-gray-800/50">
          <span className="text-2xl font-black text-white sm:text-3xl">
            {totalSeriesIssues.toLocaleString()}
          </span>
                    <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Total Issues in Series
          </span>
                </div>

                {/* Story Arcs */}
                <div className="flex flex-col items-center justify-center p-4 text-center transition-colors hover:bg-gray-800/50">
          <span className="text-2xl font-black text-red-500 sm:text-3xl">
            {storyArcsCount}
          </span>
                    <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Story Arcs
          </span>
                </div>

            </div>
        </div>
    );
}