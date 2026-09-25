export interface ComicVineImage {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string;
}

export interface ComicVineVolume {
    id: number;
    name: string;
    api_detail_url: string;
}

export interface ComicVineCharacterCredit {
    id: number;
    name: string;
    site_detail_url?: string;
    api_detail_url?: string;
    image?: ComicVineImage;
}

export interface ComicVineIssue {
    id: number;
    name: string | null;
    issue_number: string;
    cover_date: string | null;
    description: string | null;
    image: ComicVineImage;
    volume: ComicVineVolume;
    api_detail_url: string;
    character_credits?: ComicVineCharacterCredit[]; // Character list from API
}

export interface ComicVineResponse<T> {
    error: string;
    limit: number;
    offset: number;
    number_of_page_results: number;
    number_of_total_results: number;
    status_code: number;
    results: T;
}