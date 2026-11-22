export type Like = {
    id: number;
    userId: number;
    postId: number;
}

export async function getLikesByUserId(userId: number): Promise<Like[]> {
    const likes = await fetch(`/api/likes/${userId}`);

    if (!likes.ok)
        throw new Error("Could not acces to your likes.");
    return likes.json();
}
