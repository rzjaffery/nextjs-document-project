import {ComicVineIssue, ComicVineResponse} from "@/app/comic-vault/lib/types";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives";

const BASE_URL = 'https://comicvine.gamespot.com/api';

export interface VaultStats {
    volumesCount: number;
    episodesCount: number;
    moviesCount: number;
}

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
export async function getVaultStats(): Promise<VaultStats> {
    const apiKey = getApiKey();
    const headers = { 'User-Agent': 'NextJSComicVaultApp/1.0' };

    try {
        // Fetch count headers for volumes, episodes, and movies in parallel
        const [volumesRes, episodesRes, moviesRes] = await Promise.all([
            fetch(`${BASE_URL}/volumes/?api_key=${apiKey}&format=json&limit=1`, {
                headers,
                next: { revalidate: 86400 }, // Cache stats for 24 hours
            }),
            fetch(`${BASE_URL}/episodes/?api_key=${apiKey}&format=json&limit=1`, {
                headers,
                next: { revalidate: 86400 },
            }),
            fetch(`${BASE_URL}/movies/?api_key=${apiKey}&format=json&limit=1`, {
                headers,
                next: { revalidate: 86400 },
            }),
        ]);

        const [volumesData, episodesData, moviesData] = await Promise.all([
            volumesRes.ok ? volumesRes.json() : Promise.resolve({ number_of_total_results: 0 }),
            episodesRes.ok ? episodesRes.json() : Promise.resolve({ number_of_total_results: 0 }),
            moviesRes.ok ? moviesRes.json() : Promise.resolve({ number_of_total_results: 0 }),
        ]);

        return {
            volumesCount: volumesData.number_of_total_results || 0,
            episodesCount: episodesData.number_of_total_results || 0,
            moviesCount: moviesData.number_of_total_results || 0,
        };
    } catch (error) {
        console.error('Failed to fetch vault stats:', error);
        return { volumesCount: 0, episodesCount: 0, moviesCount: 0 };
    }
}