export default function Loading() {
    return (
        <main className="min-h-screen bg-black px-4 py-8 sm:px-8">
            <div className="mb-8 h-10 w-64 animate-pulse rounded bg-gray-800" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="aspect-[2/3] animate-pulse rounded-lg bg-gray-900" />
                ))}
            </div>
        </main>
    );
}