import Logo from "../assets/logo_palantir.webp";
import { TbCrystalBall } from "react-icons/tb";

export default function Header() {
    return (
        <header className="flex justify-between p-4 items-center bg-[var(--common-accent)] text-[var(--common-background)]">
            <div className="flex justify-center gap-4 items-center cursor-pointer hover:scale-110 active:scale-95 transition-all ease-out">
                <img src={Logo} alt="Logo" className="h-16 rounded-[15px]"/>
                <h1 className="text-3xl font-bold">Palantír</h1>
            </div>
            <div>
                <nav>
                    <ul className="flex justify-center gap-4 items-center text-xl">
                        <li className="cursor-pointer hover:scale-110 active:scale-95 transition-all ease-out">Home</li>
                        <li className="cursor-pointer hover:scale-110 active:scale-95 transition-all ease-out">Followers</li>
                        <li className="cursor-pointer hover:scale-110 active:scale-95 transition-all ease-out">Following</li>
                        <li className="cursor-pointer hover:scale-110 active:scale-95 transition-all ease-out">Settings</li>
                    </ul>
                </nav>
            </div>
            <div className="flex items-center rounded-full border border-[var(--common-border)] bg-[var(--common-card)] px-2">
                <input type="text" name="search" id="search" placeholder="Search someone" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[var(--common-text-primary)] outline-none placeholder:text-[var(--common-text-secondary)]" />
                <button className="shrink-0 rounded-full p-2 text-[var(--common-accent)] hover:bg-[var(--common-background)] hover:scale-110 active:scale-95 transition-all ease-out">
                    <TbCrystalBall size={24} />
                </button>
            </div>
        </header>
    )
}