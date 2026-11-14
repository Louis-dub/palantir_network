export type LoginResponse = {
    token: string;
    user: {
        id: number;
        username: string;
        race: string;
        profession: string | null;
        kingdom: string | null;
        house_clan: string | null;
    };
};

export async function login(username: string, password: string): Promise<LoginResponse> {
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