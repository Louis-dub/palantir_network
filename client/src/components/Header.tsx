import { useEffect, useState, type SubmitEvent } from "react";
import type { User } from "../api/auth";
import Logo from "../assets/logo_palantir.webp";
import { TbCrystalBall } from "react-icons/tb";
import { useGetUserByUsername } from "../hooks/useGetUserByUsername";

export type UserState = {
    isLoading: boolean;
    error: Error;
}

export function Header({ setUser, setUserState }: {
    setUser: (user: User | undefined) => void,
    setUserState: (userState: UserState) => void,
}) {
    const [inputValue, setInputValue] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const {data: user, isLoading, error} = useGetUserByUsername(searchQuery);

    useEffect(() => {
        if (searchQuery !== "") {
            setUser(user);
            setUserState({ isLoading, error });
        }
    }, [user, isLoading, error]);

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        setSearchQuery(inputValue);
    }

    function handleHome() {
        setUser(undefined);
        setUserState({isLoading: false, error: null});
    }
    
    return (
        <header className="flex flex-col gap-4 items-stretch md:flex-row md:justify-between md:items-center p-4 items-center bg-[var(--common-accent)] text-[var(--common-background)]">
            <div
                className="flex justify-center gap-4 items-center cursor-pointer hover:scale-110 active:scale-95 transition-all ease-out"
                onClick={handleHome}
            >
                <img src={Logo} alt="Logo" className="h-16 rounded-[15px]"/>
                <h1 className="text-3xl font-bold">Palantír</h1>
            </div>
            <div>
                <nav>
                    <ul className="flex flex-wrap justify-center gap-4 items-center text-xl">
                        <li className="cursor-pointer hover:scale-110 active:scale-95 transition-all ease-out" onClick={handleHome}>Home</li>
                        <li className="cursor-pointer hover:scale-110 active:scale-95 transition-all ease-out">Followers</li>
                        <li className="cursor-pointer hover:scale-110 active:scale-95 transition-all ease-out">Following</li>
                        <li className="cursor-pointer hover:scale-110 active:scale-95 transition-all ease-out">Settings</li>
                    </ul>
                </nav>
            </div>
            <form
                className="flex items-center w-full md:w-auto rounded-full border border-[var(--common-border)] bg-[var(--common-card)] px-2"
                onSubmit={e => handleSubmit(e)}
            >
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search someone"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    required
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[var(--common-text-primary)] outline-none placeholder:text-[var(--common-text-secondary)]"
                />
                <button
                    type="submit"
                    className="shrink-0 rounded-full p-2 text-[var(--common-accent)] hover:bg-[var(--common-background)] hover:scale-110 active:scale-95 transition-all ease-out"
                >
                    <TbCrystalBall size={24} />
                </button>
            </form>
        </header>
    )
}
