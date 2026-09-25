import {ComicVineIssue, ComicVineResponse} from "@/app/comic-vault/lib/types";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives";

const BASE_URL = 'https://comicvine.gamespot.com/api';

function getApiKey(): string{
    const key = process.env.COMIC_VINE_API_KEY;
    if (!key){
        return 'API_KEY is missing from .env.local';
    }
    return key;
}

export async function getComics(page:number = 1, limit: number = 20) {
    const apiKey = getApiKey();
    const offset = (page - 1) * limit;

    const url = `${BASE_URL}/issues/?api_key=${apiKey}&format=json&limit=${limit}&offset=${offset}&sort=cover_date:desc`;
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'NextJSComicVaultApp/1.0',
        },
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch issues: ${res.statusText}`);
    }
    const data: ComicVineResponse<ComicVineIssue[]> = await res.json();

    return {
        comics: data.results,
        total: data.number_of_total_results, // Total count for page calculations
    };
}

export async function getComicById(id:string): Promise<ComicVineIssue | null> {
    const apiKey = getApiKey();
    const formattedId = id.startsWith('4000-') ? id : `4000-${id}`;
    const url = `${BASE_URL}/issue/${formattedId}/?api_key=${apiKey}&format=json`;

    const res = await fetch(url,{
        headers: {
            'User-Agent': 'NextJSComicVaultApp/1.0',
        },
        next:{revalidate:3600},
    });
    if (!res.ok){
        if(res.status === 404) return null;
        throw new Error(`Failed to fetch issue details for ID ${id}`);
    }
    const data: ComicVineResponse<ComicVineIssue> = await res.json();
    return data.results || null;
}
