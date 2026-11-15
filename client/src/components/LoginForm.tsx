import { useState, type SubmitEvent } from "react";
import useLogin from "../hooks/useLogin";

export default function LoginForm() {
    const [usernameInput, setUsernameInput] = useState("");
    const [pwdInput, setPwdInput] = useState("");
    const login = useLogin();

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        login.mutate({ username: usernameInput, password: pwdInput });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>You who return to the Palantír, prove that the Palantír knows you.</h1>
                <label htmlFor="username">What name did you give the Palantír ?</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={usernameInput}
                    onChange={e => setUsernameInput(e.target.value)}
                />
                <label htmlFor="password">Speak friend and enter.</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={pwdInput}
                    onChange={e => setPwdInput(e.target.value)}
                />
                {login.error && (
                    <p>The Palantír doesn't know you.</p>
                )}
                <button
                    type="submit"
                >
                    Access the Palantír.
                </button>
            </form>
            <p>The Palantír doesn't recognise you. <a href="#">Let him get to know you.</a></p>
        </div>
    );
}