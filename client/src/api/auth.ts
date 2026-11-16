export type User = {
    id: number;
    username: string;
    race: string;
    profession: string | null;
    kingdom: string | null;
    house_clan: string | null;
}

export type LoginResponse = {
    token: string;
    user: User;
};

export type LoginUser = {
    username: string;
    password: string;
}

export type RegisterUser = {
    username: string;
    password: string;
    race: string;
    profession: string | null;
    kingdom: string | null;
    house_clan: string | null;
}

export async function login({username, password}: LoginUser): Promise<LoginResponse> {
    const user = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!user.ok) {
        const errorResponse: { error: string } = await user.json();
        throw new Error(errorResponse.error);
    }

    return user.json();
};

export async function register({
    username,
    password,
    race,
    profession,
    kingdom,
    house_clan
}: RegisterUser): Promise<LoginResponse> {
    const user = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, race, profession, kingdom, house_clan }),
    });

    if (!user.ok) {
        const errorResponse: { error: string } = await user.json();
        throw new Error(errorResponse.error);
    }

    return user.json();
}