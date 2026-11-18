export type Post = {
    id: number;
    username: string;
    content: string;
    created_at: string;
};

export async function getPosts(): Promise<Post[]> {
    const posts = await fetch("/api/posts");

    if (!posts.ok)
        throw new Error("Could not load posts.");
    return posts.json();
}

export async function createPost(content: string) {
    const token = sessionStorage.getItem("token");
    const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
    });

    if (!response.ok) {
        const errorResponse: { error: string } = await response.json();
        throw new Error(errorResponse.error);
    }
}