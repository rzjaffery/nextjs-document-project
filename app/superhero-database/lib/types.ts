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

export type HeroCardProps = {
    hero: Superhero;
    onSelect: (hero: Superhero) => void;
};

export type FilterControlsProps = {
    search: string;
    setSearch: (val: string) => void;
    alignment: string;
    setAlignment: (val: string) => void;
    publisher: string;
    setPublisher: (val: string) => void;
    publishers: string[];
};

export type HeroModalProps = {
    hero: Superhero | null;
    onClose: () => void;
};

export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    pageSizeOptions?: number[];
};
