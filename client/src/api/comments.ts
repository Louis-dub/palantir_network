export type Comment = {
    id: number;
    user_id: number;
    post_id: number;
    content: sring;
}

export async function getCommentsByPostId(id: number) {
    const response = await fetch(`/api/comments/${id}`);

    if (!response.ok)
        throw new Error("Could not load comments.");
    return response.json();
}
