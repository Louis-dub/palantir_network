import type { User } from "../api/auth";
import { useAuth } from "../contexts/useAuth";
import { useEffect, useState } from "react";

export default function Profile({ user }: { user: User | null }) {
    const auth = useAuth();
    const currentUser = user ? user : auth.user;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (isMobile) {
        return null;
    }

    return (
        <section className="w-full rounded-2xl border border-[var(--common-border)] bg-[var(--common-card)] p-5 text-[var(--common-text-primary)] shadow-[0_0_40px_rgba(208,173,105,0.1)] sm:p-6 md:min-h-[calc(100vh-120px)] md:w-1/3 md:flex-none">
            <header className="mb-6 flex items-center gap-4 border-b border-[var(--common-border)] pb-5">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-[var(--common-accent)] bg-[var(--common-background)] text-2xl font-bold text-[var(--common-accent)]">
                    {currentUser.username.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                    <h1 className="break-words text-2xl font-bold sm:text-3xl">{currentUser.username}</h1>
                    <p className="mt-1 text-base font-medium text-[var(--common-accent)]">{currentUser.race}</p>
                </div>
            </header>

            {currentUser.race === "Ent" ? (
                <p className="rounded-xl border-l-4 border-[var(--common-accent)] bg-[var(--common-background)] p-5 text-lg italic leading-relaxed text-[var(--common-text-secondary)]">
                    <i>"May your years be as long as your roots, and may the world still need your patience."</i>
                </p>
            ) : currentUser.race === "Istar" ? (
                <p className="rounded-xl border-l-4 border-[var(--common-accent)] bg-[var(--common-background)] p-5 text-lg italic leading-relaxed text-[var(--common-text-secondary)]">
                    <i>"The sea that brought you here will not take you back. You have chosen Middle-earth — it is all you have left."</i>
                </p>
            ) : (
                <div className="space-y-3">
                    <p className="rounded-xl border border-[var(--common-border)] bg-[var(--common-background)] px-4 py-3 text-base text-[var(--common-text-secondary)]">
                        My people: <span className="font-semibold text-[var(--common-text-primary)]">{currentUser.house_clan}</span>
                    </p>
                    <p className="rounded-xl border border-[var(--common-border)] bg-[var(--common-background)] px-4 py-3 text-base text-[var(--common-text-secondary)]">
                        Child of <span className="font-semibold text-[var(--common-text-primary)]">{currentUser.kingdom}</span>
                    </p>
                    <p className="rounded-xl border border-[var(--common-border)] bg-[var(--common-background)] px-4 py-3 text-base text-[var(--common-text-secondary)]">
                        I am <span className="font-semibold text-[var(--common-text-primary)]">{currentUser.profession}</span>
                    </p>
                </div>
            )}
        </section>
    );
}
