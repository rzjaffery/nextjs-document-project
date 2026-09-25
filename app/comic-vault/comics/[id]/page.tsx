import { getComicById } from '@/app/comic-vault/lib/comic-api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const comic = await getComicById(id);

    if (!comic) return { title: 'Comic Not Found' };

    const title = comic.name || `${comic.volume.name} #${comic.issue_number}`;
    return {
        title: `${title} | Comic Vault`,
        description: `Details for ${title}`,
    };
}

export default async function ComicDetailPage({ params }: PageProps) {
    const { id } = await params;
    const comic = await getComicById(id);

    if (!comic) {
        notFound();
    }

    const title = comic.name || `${comic.volume.name} #${comic.issue_number}`;

    return (
        <main className="min-h-screen bg-black p-4 text-white sm:p-8">
            <Link
                href="/comic-vault"
                className="mb-6 inline-block text-sm font-semibold text-red-500 hover:underline"
            >
                ← Back to Catalog
            </Link>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-900">
                    <Image
                        src={comic.image.super_url || comic.image.medium_url}
                        alt={title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col md:col-span-2">
                    <h1 className="text-2xl font-bold sm:text-4xl">{title}</h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Series: {comic.volume.name} | Release Date: {comic.cover_date || 'N/A'}
                    </p>

                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-red-500">Overview</h2>
                        <div
                            className="prose prose-invert mt-2 max-w-none text-gray-300"
                            dangerouslySetInnerHTML={{
                                __html: comic.description || '<p>No description provided for this issue.</p>',
                            }}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}