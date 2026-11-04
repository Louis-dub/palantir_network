type Post = {
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