export type Powerstats = {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
};

export type Superhero = {
    id: number;
    name: string;
    slug: string;
    powerstats: Powerstats;
    appearance: {
        gender: string;
        race: string | null;
        height: string[];
        weight: string[];
    };
    biography: {
        fullName: string;
        alterEgos: string;
        firstAppearance: string;
        publisher: string | null;
        alignment: string;
    };
    images: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
    };
};