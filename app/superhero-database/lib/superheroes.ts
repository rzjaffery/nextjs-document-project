import {Superhero} from "@/app/superhero-database/lib/types";

export async function fetchSuperheroes (): Promise<Superhero[]> {
    const res = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json", {
        next: { revalidate: 86400 } // Cache data for 24 hours
    });

    if (!res.ok) {
        throw new Error("Failed to fetch superhero data");
    }

    return res.json();
}