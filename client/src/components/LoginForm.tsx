import { useState, type SubmitEvent } from "react";
import useLogin from "../hooks/useLogin";

type LoginFormRegsiterProps = {
    onShowRegister: () => void;
}

export default function LoginForm({ onShowRegister }: LoginFormRegsiterProps) {
    const [usernameInput, setUsernameInput] = useState("");
    const [pwdInput, setPwdInput] = useState("");
    const login = useLogin();

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        login.mutate({ username: usernameInput, password: pwdInput });
    }

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
                            You, who return to the Palantír, prove that the Palantír knows you.
                        </h1>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-[var(--common-text-secondary)]"
                            >
                                What name did you give the Palantír ?
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={usernameInput}
                                required
                                onChange={e => setUsernameInput(e.target.value)}
                                className="w-full rounded-lg border border-[var(--common-border)] bg-[var(--common-background)] px-4 py-3 text-[var(--common-text-primary)]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-[var(--common-text-secondary)]"
                            >
                                Speak friend and enter.
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={pwdInput}
                                required
                                onChange={e => setPwdInput(e.target.value)}
                                className="w-full rounded-lg border border-[var(--common-border)] bg-[var(--common-background)] px-4 py-3 text-[var(--common-text-primary)]"
                            />
                        </div>
                    </div>

                    {login.error && (
                        <p className="text-sm text-red-400" role="alert">
                            The Palantír doesn't know you.
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={login.isPending}
                        className="w-full rounded-lg bg-[var(--common-accent)] px-4 py-3 font-semibold text-[var(--common-background)] transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {login.isPending ? "The Palantír is listening..." : "Access the Palantír."}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-[var(--common-text-secondary)]">
                    The Palantír doesn't recognise you ?{" "}
                    <button type="button" onClick={onShowRegister} className="font-medium text-[var(--common-accent)] hover:underline">
                        Let him get to know you.
                    </button>
                </p>
            </div>
        </div>
    );
}