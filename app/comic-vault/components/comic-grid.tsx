import {ComicVineIssue} from "@/app/comic-vault/lib/types";
import {ComicCard} from "@/app/comic-vault/components/comic-card";

interface ComicGridProps {
    comics:ComicVineIssue[]
}
export function ComicGrid({comics}: ComicGridProps) {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {comics.map((comic) => (
                <ComicCard key={comic.id} comic={comic} />
            ))}
        </div>
    )
}