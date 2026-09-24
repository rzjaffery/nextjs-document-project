export interface Powerstats {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
}

export interface Biography {
    fullName: string;
    alterEgos: string;
    aliases: string[];
    placeOfBirth: string;
    firstAppearance: string;
    publisher: string;
    alignment: string;
}

export interface Images {
    xs: string;
    sm: string;
    md: string;
    lg: string;
}

export interface ComicCharacter {
    id: number;
    name: string;
    slug: string;
    powerstats: Powerstats;
    biography: Biography;
    images: Images;
}