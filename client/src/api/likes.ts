export type Like = {
    id: number;
    user_id: number;
    post_id: number;
}

export async function getLikesByUserId(userId: number): Promise<Like[]> {
    const response = await fetch(`/api/likes/${userId}`);

    if (!response.ok)
        throw new Error("Could not access to your likes.");
    return response.json();
}

export async function createLikePostApi(postId: number) {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`/api/likes/${postId}`, {
        method: "POST",
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

export async function deleteLikePostApi(postId: number) {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`/api/likes/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });;

    if (!response.ok) {
        const errorRespone: { error: string } = await response.json();
        throw new Error(errorRespone.error);
    }
}
