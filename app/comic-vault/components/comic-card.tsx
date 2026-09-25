import {ComicVineIssue} from "@/app/comic-vault/lib/types";
import Link from "next/link";
import Image from "next/image";

interface ComicCardProps {
    comic: ComicVineIssue
}
export function ComicCard({comic}: ComicCardProps) {
    const title = comic.name || `${comic.volume.name} #${comic.issue_number}`
    return (
        <Link
            href={`/comics/${comic.id}`}
            className="group flex flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-900 transition-transform duration-200 hover:-translate-y-1 hover:border-red-600"
        >
            <div className="relative aspect-2/3 w-full overflow-hidden bg-gray-950">
                <Image
                    src={comic.image.medium_url}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-2 text-sm font-bold text-white group-hover:text-red-500">
                    {title}
                </h3>
                <p className="mt-auto pt-2 text-xs text-gray-400">
                    Issue #{comic.issue_number}
                </p>
            </div>
        </Link>
    );
}