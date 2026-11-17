import { useEffect, useState, type SubmitEvent } from "react";
import useRegister from "../hooks/useRegister";

export default function RegisterForm() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [race, setRace] = useState<string>("");
    const [kingdom, setKingdom] = useState<string>("");
    const [profession, setProfession] = useState<string>("");
    const [houseClan, setHouseClan] = useState<string>("");
    const races = ["Hobbit", "Man", "Elf", "Dwarf", "Ent", "Istar"];
    const elfClan = ["Nandor", "Tawarwaith", "Laegeldrim", "Sindar", "Eglath", "Iathrim", "Mithrim", "Falathrim"];
    const elfKingdom = ["Lothlórien", "Woodland Realm", "Rivendell", "Dorwinion"];
    const manClan = ["House of Bëor", "House of Hador", "Númenórean", "Free man", "Rohirrim"];
    const manKingdom = ["Númenor", "Gondor", "Arnor", "Bree-land", "Rohan", "Dale", "Woodman of Western Mirkwood", "Beornings"];
    const dwarfClan = ["Longbeards", "Firebeards", "Broadbeams", "Ironfists", "Stiffbeards", "Blacklocks", "Stonefoots"];
    const dwarfKingdom = ["Khazad-dûm", "Grey Mountains", "Erebor", "Blue Mountains", "Iron Hills"];
    const hobbitClan = ["Baggins", "Took", "Gamgee", "Brandybuck", "Cotton", "Sackville-Baggins", "Chubb-Baggins", "Proudfoot"];
    const hobbitKingdom = ["Vale of Anduin", "Angle", "Swanfleet", "Weather Hills", "Bree-land", "The Shire", "Buckland"];
    const register = useRegister();
    let raceClan: string[] = [];
    let raceKingdom: string[] = [];

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        register.mutate({
            username: username,
            password: password,
            race: race,
            kingdom: ["Istar", "Ent"].includes(race) ? null : kingdom,
            profession: ["Istar", "Ent"].includes(race) ? null : profession,
            house_clan: ["Istar", "Ent"].includes(race) ? null : houseClan,
        });
    }

    useEffect(() => {
        switch (race) {
            case "Elf":
                raceClan = elfClan;
                raceKingdom = elfKingdom;
                break;
            case "Man":
                raceClan = manClan;
                raceKingdom = manKingdom;
                break;
            case "Dwarf":
                raceClan = dwarfClan;
                raceKingdom = dwarfKingdom;
                break;
            case "Hobbit":
                raceClan = hobbitClan;
                raceKingdom = hobbitKingdom;
                break;
            default:
                raceClan = [];
                raceKingdom = [];
                break;
        }
    }, [race])

    return (
        <div className="grid min-h-screen place-items-center px-4 py-10">
            <div className="w-full max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-2xl border border-[var(--common-border)] bg-[var(--common-card)] p-6 shadow-[0_0_50px_rgba(208,173,105,0.12)] sm:p-8"
                >
                    <div className="space-y-3 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--common-accent)]">
                            Palantír
                        </p>
                        <h1 className="text-2xl font-semibold leading-tight text-[var(--common-text-primary)] sm:text-3xl">
                            You, who wish to see through the Palantir, make yourself known to it.
                        </h1>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-[var(--common-text-secondary)]"
                            >
                                What name were you given in the land of Arda ?
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                minLength={3}
                                maxLength={30}
                                required
                                onChange={e => setUsername(e.target.value)}
                                className="w-full rounded-lg border border-[var(--common-border)] bg-[var(--common-background)] px-4 py-3 text-[var(--common-text-primary)]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-[var(--common-text-secondary)]"
                            >
                                Give it to the Palantir so it can recognise you.
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                minLength={12}
                                required
                                onChange={e => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-[var(--common-border)] bg-[var(--common-background)] px-4 py-3 text-[var(--common-text-primary)]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="race"
                                className="block text-sm font-medium text-[var(--common-text-secondary)]"
                            >
                                How did you come to be in Middle-earth ?
                            </label>
                            <select
                                name="race"
                                id="race"
                                value={race}
                                required
                                onChange={e => setRace(e.target.value)}
                                className="w-full rounded-lg border border-[var(--common-border)] bg-[var(--common-background)] px-4 py-3 text-[var(--common-text-primary)]"
                            >
                                <option value="" disabled hidden></option>
                                {races.map(race => <option key={race} value={race}>{race}</option>)}
                            </select>
                        </div>

                        {race && race !== "Istar" && race !== "Ent" && (
                            <>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="house-clan"
                                        className="block text-sm font-medium text-[var(--common-text-secondary)]"
                                    >
                                        Which people saw you come into being amongst them ?
                                    </label>
                                    <select
                                        name="house-clan"
                                        id="house-clan"
                                        value={houseClan}
                                        required
                                        onChange={e => setHouseClan(e.target.value)}
                                        className="w-full rounded-lg border border-[var(--common-border)] bg-[var(--common-background)] px-4 py-3 text-[var(--common-text-primary)]"
                                    >
                                        <option value="" disabled hidden></option>
                                        {raceClan.map(clan => <option key={clan} value={clan}>{clan}</option>)}
                                    </select>
                                </div>
                                
                                <div className="space-y-2">
                                    <label
                                        htmlFor="kingdom"
                                        className="block text-sm font-medium text-[var(--common-text-secondary)]"
                                    >
                                        {race === "Hobbit"
                                            ? "What are the lands that saw you born ?"
                                            : "For which crown do you dedicate your life ?"}
                                    </label>
                                    <select
                                        name="kingdom"
                                        id="kingdom"
                                        value={kingdom}
                                        required
                                        onChange={e => setKingdom(e.target.value)}
                                        className="w-full rounded-lg border border-[var(--common-border)] bg-[var(--common-background)] px-4 py-3 text-[var(--common-text-primary)]"
                                    >
                                        <option value="" disabled hidden></option>
                                        {raceKingdom.map(rKingdom => <option key={rKingdom} value={rKingdom}>{rKingdom}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="profession"
                                        className="block text-sm font-medium text-[var(--common-text-secondary)]"
                                    >
                                        {race !== "Hobbit"
                                            ? "What is the work entrusted to thy hands ?"
                                            : "How do you serve your king ?"}
                                    </label>
                                    <input
                                        type="text"
                                        name="profession"
                                        id="profession"
                                        value={profession}
                                        minLength={3}
                                        maxLength={30}
                                        required
                                        onChange={e => setProfession(e.target.value)}
                                        className="w-full rounded-lg border border-[var(--common-border)] bg-[var(--common-background)] px-4 py-3 text-[var(--common-text-primary)]"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {register.error && (
                        <p className="text-sm text-red-400" role="alert">
                            The Palantír has already seen you.
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={register.isPending}
                        className="w-full rounded-lg bg-[var(--common-accent)] px-4 py-3 font-semibold text-[var(--common-background)] transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {register.isPending ? "The Palantír is listening..." : "Access the Palantír."}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-[var(--common-text-secondary)]">
                    The Palantír know you ?{" "}
                    <a href="#" className="font-medium text-[var(--common-accent)] hover:underline">
                        Let him look at you anew.
                    </a>
                </p>
            </div>
        </div>
    );
}