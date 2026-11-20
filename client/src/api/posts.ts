export type Post = {
    id: number;
    username: string;
    author_id: number;
    content: string;
    created_at: string;
};

export async function getPosts(): Promise<Post[]> {
    const posts = await fetch("/api/posts");

    if (!posts.ok)
        throw new Error("Could not load posts.");
    return posts.json();
}

export async function getPostsById(id: number): Promise<Post[]> {
    const posts = await fetch(`/api/posts/${id}`);

    if (!posts.ok)
        throw new Error("Could not load posts.");
    return posts.json();
}

export async function createPostApi(content: string) {
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

export async function deletePostApi(id: number) {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorResponse: { error: string } = await response.json();
        throw new Error(errorResponse.error);
    }
}
