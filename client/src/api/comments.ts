export type Comment = {
    id: number;
    user_id: number;
    post_id: number;
    content: string;
}

export async function getCommentsByPostId(id: number) {
    const response = await fetch(`/api/comments/${id}`);

    if (!response.ok)
        throw new Error("Could not load comments.");
    return response.json();
}

export async function postComment(id: number, content: string) {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`/api/comments/${id}`, {
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

export async function deleteComment(id: number) {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`/api/comments/${id}`, {
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

