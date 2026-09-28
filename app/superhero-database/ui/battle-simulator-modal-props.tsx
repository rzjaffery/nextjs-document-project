'use client'

import {Superhero} from "@/app/superhero-database/lib/types";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";

type BattleSimulatorModalProps = {
    hero1: Superhero | null;
    hero2: Superhero | null;
    onClose: () => void;
}
type CombatLog = {
    round : number;
    text: string;
    type: 'hit'|'crit'|'dodge'|'victory';
    attackerName?: string;
}

export default function BattleSimulatorModal({hero1,  hero2, onClose}:BattleSimulatorModalProps) {
    if (!hero1 || !hero2) return null;

    const calMaxHp = (hero: Superhero) => {
        const dur = hero.powerstats.durability || 10;
        const str = hero.powerstats.strength || 10;
        return (dur * 6) + (str * 4) + 120;
    }

    const maxHp1 = calMaxHp(hero1)
    const maxHp2 = calMaxHp(hero2)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hp1, setHp1] = useState(maxHp1);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hp2, setHp2] = useState(maxHp2);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentRound, setCurrentRound] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [logs, setLogs] = useState<CombatLog[]>([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [winner, setWinner] = useState<Superhero | 'tie' | null>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const logContainer = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (logContainer.current) {
            logContainer.current.scrollTop = logContainer.current.scrollHeight;
        }
    }, [logs]);

    const executeRound = (currentHp1: number, currentHp2: number, roundNum: number) => {
        if (currentHp1 <= 0 || currentHp1 <= 0 || winner) return;

        let newHp1 = currentHp1;
        let newHp2 = currentHp2;
        const newLogs: CombatLog[] = []

        const spd1 = (hero1.powerstats.speed || 10) + (hero1.powerstats.intelligence || 10) * 0.2;
        const spd2 = (hero2.powerstats.speed || 10) + (hero2.powerstats.intelligence || 10) * 0.2;

        const attackerFirst = spd1 >= spd2 ? hero1 : hero2;
        const defenderFirst = attackerFirst.id === hero1.id ? hero2 : hero1;

        const performAttack = (attacker: Superhero, defender: Superhero, targetHp: number) => {
            const combat = attacker.powerstats.combat || 10;
            const str = attacker.powerstats.strength || 10;
            const pwr = attacker.powerstats.power || 10;
            const defDur = defender.powerstats.durability || 10;
            const defSpd = defender.powerstats.speed || 10;

            // Dogde Attack
            const dodgeChance = Math.min(Math.max((defSpd - (attacker.powerstats.speed || 10)) * 0.3, 5), 30);
            const isDodge = Math.random() * 100 < dodgeChance;

            if (isDodge) {
                newLogs.push({
                    round: roundNum,
                    text: `🌀 ${defender.name} agilely dodged ${attacker.name}'s incoming strike!`,
                    type: 'dodge',
                    attackerName: attacker.name,
                });
                return targetHp;
            }

            // Critical Hit
            const critChance = Math.min(combat * 0.4, 40)
            const isCrit = Math.random() * 100 < critChance;

            // Damage Calculation
            const rawDamage = str * 0.5 + pwr * 0.5 + Math.floor(Math.random() * 15) + 10;
            const mitigation = defDur * 0.25;
            const finalDamage = Math.max(8, Math.round((rawDamage - mitigation) * (isCrit ? 1.6 : 1.0)));

            const nextHp = Math.max(0, targetHp - finalDamage);

            newLogs.push({
                round: roundNum,
                text: `${isCrit ? '💥 CRITICAL HIT! ' : '⚔️ '}${attacker.name} hit ${defender.name} for ${finalDamage} DMG! (${nextHp}/${calMaxHp(defender)} HP remaining)`,
                type: isCrit ? 'crit' : 'hit',
                attackerName: attacker.name,
            });

            return nextHp;
        }

        // Turn 1
        newHp2 = attackerFirst.id === hero1.id
            ? performAttack(hero1, hero2, currentHp2)
            : performAttack(hero2, hero1, currentHp1);

        if (attackerFirst.id === hero1.id) {
            if (newHp2 <= 0) {
                setWinner(hero1);
                newLogs.push({
                    round: roundNum,
                    text: `🏆 KNOCKOUT! ${hero1.name} wins the battle in Round ${roundNum}!`,
                    type: 'victory',
                });
                setHp2(0);
                setLogs((prev) => [...prev, ...newLogs]);
                setIsAutoPlaying(false);
                return;
            }
        } else {
            newHp1 = newHp2; // update local pointer
            newHp2 = currentHp2;
            if (newHp1 <= 0) {
                setWinner(hero2);
                newLogs.push({
                    round: roundNum,
                    text: `🏆 KNOCKOUT! ${hero2.name} wins the battle in Round ${roundNum}!`,
                    type: 'victory',
                });
                setHp1(0);
                setLogs((prev) => [...prev, ...newLogs]);
                setIsAutoPlaying(false);
                return;
            }
        }

        // Retaliation Attack (If defender survived)
        if (attackerFirst.id === hero1.id) {
            newHp1 = performAttack(hero2, hero1, currentHp1);
            if (newHp1 <= 0) {
                setWinner(hero2);
                newLogs.push({
                    round: roundNum,
                    text: `🏆 KNOCKOUT! ${hero2.name} counter-attacks for victory in Round ${roundNum}!`,
                    type: 'victory',
                });
                setIsAutoPlaying(false);
            }
        } else {
            newHp2 = performAttack(hero1, hero2, currentHp2);
            if (newHp2 <= 0) {
                setWinner(hero1);
                newLogs.push({
                    round: roundNum,
                    text: `🏆 KNOCKOUT! ${hero1.name} counter-attacks for victory in Round ${roundNum}!`,
                    type: 'victory',
                });
                setIsAutoPlaying(false);
            }
        }

        // Stalemate / Max Round Safeguard (Round 20)
        if (roundNum >= 20 && !winner) {
            const winnerByHp = newHp1 > newHp2 ? hero1 : newHp2 > newHp1 ? hero2 : 'tie';
            setWinner(winnerByHp);
            newLogs.push({
                round: roundNum,
                text: winnerByHp === 'tie'
                    ? `⚖️ BATTLE DRAW! Both heroes exhausted after 20 rounds.`
                    : `⏱️ TIME EXPIRED! ${winnerByHp.name} wins by decision with higher remaining HP!`,
                type: 'victory',
            });
            setIsAutoPlaying(false);
        }

        setHp1(newHp1);
        setHp2(newHp2);
        setCurrentRound(roundNum);
        setLogs((prev) => [...prev, ...newLogs]);
    };

    // Auto Play Interval Loop
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoPlaying && !winner) {
            interval = setInterval(() => {
                executeRound(hp1, hp2, currentRound + 1);
            }, 800);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, hp1, hp2, currentRound, winner, executeRound]);

    const handleReset = () => {
        setHp1(maxHp1);
        setHp2(maxHp2);
        setCurrentRound(0);
        setLogs([]);
        setWinner(null);
        setIsAutoPlaying(false);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative drop-shadow-2xl w-full max-w-3xl overflow-hidden rounded-xl bg-[#3d3c3d] p-0.5 max-h-[92vh] flex flex-col">
                <div className="relative z-1 bg-[#323132] opacity-95 rounded-[10px] p-6 space-y-5 text-white overflow-y-auto flex flex-col">

                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-[#4a4949] pb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">⚔️</span>
                            <h2 className="text-xl font-black uppercase tracking-wider">
                                Battle <span className="text-red-500">Simulator</span>
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Battle Combatants Bar */}
                    <div className="grid grid-cols-2 gap-4 items-center">

                        {/* Fighter 1 */}
                        <div className={`p-3 rounded-lg border bg-[#1a1a1a] transition-all ${
                            winner === hero1 ? "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "border-[#4a4949]"
                        }`}>
                            <div className="flex items-center gap-3">
                                <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#4a4949] shrink-0">
                                    <Image src={hero1.images.md} alt={hero1.name} fill className="object-cover" />
                                </div>
                                <div className="overflow-hidden w-full">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold text-xs sm:text-sm truncate">{hero1.name}</h3>
                                        <span className="text-[10px] text-gray-400 font-mono">{hp1}/{maxHp1} HP</span>
                                    </div>
                                    {/* Animated Health Bar */}
                                    <div className="w-full h-2.5 bg-[#323132] rounded-full overflow-hidden mt-1.5 border border-[#4a4949]">
                                        <div
                                            className={`h-full transition-all duration-300 rounded-full ${
                                                (hp1 / maxHp1) > 0.5 ? "bg-emerald-500" : (hp1 / maxHp1) > 0.2 ? "bg-amber-500" : "bg-rose-600"
                                            }`}
                                            style={{ width: `${Math.max(0, (hp1 / maxHp1) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fighter 2 */}
                        <div className={`p-3 rounded-lg border bg-[#1a1a1a] transition-all ${
                            winner === hero2 ? "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "border-[#4a4949]"
                        }`}>
                            <div className="flex items-center gap-3">
                                <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#4a4949] shrink-0">
                                    <Image src={hero2.images.md} alt={hero2.name} fill className="object-cover" />
                                </div>
                                <div className="overflow-hidden w-full">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold text-xs sm:text-sm truncate">{hero2.name}</h3>
                                        <span className="text-[10px] text-gray-400 font-mono">{hp2}/{maxHp2} HP</span>
                                    </div>
                                    {/* Animated Health Bar */}
                                    <div className="w-full h-2.5 bg-[#323132] rounded-full overflow-hidden mt-1.5 border border-[#4a4949]">
                                        <div
                                            className={`h-full transition-all duration-300 rounded-full ${
                                                (hp2 / maxHp2) > 0.5 ? "bg-emerald-500" : (hp2 / maxHp2) > 0.2 ? "bg-amber-500" : "bg-rose-600"
                                            }`}
                                            style={{ width: `${Math.max(0, (hp2 / maxHp2) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Battle Control Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 bg-[#1a1a1a] p-2.5 rounded-lg border border-[#4a4949]">
                        <div className="text-xs font-bold text-gray-300 px-2">
                            Round: <span className="text-blue-400 font-extrabold">{currentRound}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => executeRound(hp1, hp2, currentRound + 1)}
                                disabled={!!winner || isAutoPlaying}
                                className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-40  text-xs font-bold text-white transition-all cursor-pointer"
                            >
                                ▶ Next Step
                            </button>

                            <button
                                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                                disabled={!!winner}
                                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                                    isAutoPlaying
                                        ? "bg-amber-600 hover:bg-amber-500 text-white"
                                        : "bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40"
                                }`}
                            >
                                {isAutoPlaying ? "⏸ Pause" : "⚡ Auto Play"}
                            </button>

                            <button
                                onClick={handleReset}
                                className="px-3 py-1.5 rounded-md bg-[#323132] hover:bg-[#3d3c3d] text-xs font-bold text-gray-300 border border-[#4a4949] cursor-pointer"
                            >
                                🔄 Reset
                            </button>
                        </div>
                    </div>

                    {/* Round Combat Log Terminal */}
                    <div className="flex-1 min-h-55 max-h-75 bg-[#141414] rounded-lg border border-[#4a4949] p-3 flex flex-col">
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2 pb-1 border-b border-[#2a2a2a] flex justify-between items-center">
                            <span>Live Combat Terminal</span>
                            <span>{logs.length} Events</span>
                        </div>

                        <div ref={logContainer} className="overflow-y-auto space-y-2 pr-2 text-xs font-mono scrollbar-thin">
                            {logs.length === 0 ? (
                                <p className="text-gray-500 text-center py-10 italic">
                                    Click &#34;Next Step&#34; or &#34;Auto Play&#34; to begin combat simulation.
                                </p>
                            ) : (
                                logs.map((log, index) => (
                                    <div
                                        key={index}
                                        className={`p-2 rounded border leading-relaxed ${
                                            log.type === 'victory' ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold" :
                                                log.type === 'crit' ? "bg-amber-500/10 border-amber-500/30 text-amber-300" :
                                                    log.type === 'dodge' ? "bg-blue-500/10 border-blue-500/30 text-blue-300" :
                                                        "bg-[#1e1e1e] border-[#323132] text-gray-300"
                                        }`}
                                    >
                                        <span className="text-[10px] font-bold opacity-60 mr-2">[R{log.round}]</span>
                                        {log.text}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}