'use client'

import {useEffect, useState} from "react";
import {Superhero} from "@/app/superhero-database/lib/types";
import {fetchSuperheroes} from "@/app/superhero-database/lib/superheroes";
import LoadingIndicator from "@/app/blog-project/ui/loading-indicator";
import FilterControls from "@/app/superhero-database/ui/filter-controls";
import HeroModal from "@/app/superhero-database/ui/hero-modal";
import HeroCard from "@/app/superhero-database/ui/hero-card";

export default function Home(){

    const [heroes, setHeroes] = useState<Superhero[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [alignment, setAlignment] = useState("all")
    const [publisher, setPublisher] = useState("all")
    const [selectedHero, setSelectedHero] = useState<Superhero | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true);
        fetchSuperheroes().then((data)=>{
            setHeroes(data);
            setLoading(false);
        })
            .catch(()=>setLoading(false))
    }, []);

    if(!mounted) return null;

    const publishers = Array.from(
        new Set(heroes.map((h) => h.biography.publisher).filter(Boolean))
    ).slice(0, 15) as string[];

    const filteredHeroes = heroes.filter((hero)=>{
        const matchesSearch = hero.name.toLowerCase().includes(search.toLowerCase())
        const matchesAlignment = alignment === 'all' || hero.biography.alignment === alignment;
        const matchesPublisher = publisher === 'all' || hero.biography.publisher === publisher;
        return matchesSearch && matchesAlignment && matchesPublisher;
    })

    if (loading) return <LoadingIndicator/>

    return (
        <main className="min-h-screen bg-[#1a1a1a] text-white p-6 sm:p-10">
            <div className="max-w-6xl mx-auto">
                {/*Header*/}
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                        SUPERHERO <span className="text-blue-400">DATABASE</span>
                    </h1>
                    <p className="text-xs text-gray-400">
                        Compare stats, alignment, and origin details across universe databases.
                    </p>
                </div>

                {/*Filter Bar*/}
                <FilterControls search={search} setSearch={setSearch} alignment={alignment} setAlignment={setAlignment} publisher={publisher} setPublisher={setPublisher} publishers={publishers}/>

                {/* Superhero Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {filteredHeroes.slice(0, 40).map((hero) => (
                        <HeroCard
                            key={hero.id}
                            hero={hero}
                            onSelect={setSelectedHero}
                        />
                    ))}
                </div>

                {/* Modal Detail View */}
                <HeroModal
                    hero={selectedHero}
                    onClose={() => setSelectedHero(null)}
                />
            </div>

        </main>
    )
}