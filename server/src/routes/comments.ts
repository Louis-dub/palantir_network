import { Router, type Request, type Response } from "express";
import { pool } from "../db/pool.js";
import { requireAuth } from "../middleware/requireAuth.js";

const commentRouter = Router();

commentRouter.get("/:id", async (req: Request, res: Response) => {
    const postId = req.params.id;

    if (!postId) {
        res.status(400).json({ error: "Post Id is required." });
        return;
    }

    try {
        const result = await pool.query(`
            SELECT comments.id, comments.user_id, users.username FROM comments
            JOIN users ON comments.user_id = users.id
            WHERE comments.post_id = $1
            ORDER BY comments.created_at DESC;
        `, [postId]);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

commentRouter.post("/:id", requireAuth, async (req: Request, res: Response) => {
    const postId = req.params.id;
    const content = req.body.content;
    const userId = req.authUserId;

    if (!postId || !content) {
        res.status(400).json({ error: "Post Id and content are required." });
        return;
    }

    try {
        const result = await pool.query(`
            INSERT INTO comments (user_id, post_id, content)
            VALUES ($1, $2, $3)
            RETURNING id, user_id, post_id, content;
        `, [userId, postId, content]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

commentRouter.delete("/:id", requireAuth, async (req: Request, res: Response) => {
    const commentId = req.params.id;

    if (!commentId) {
        res.status(400).json({ error: "Comment Id is required." });
        return;
    }

    try {
        const result = await pool.query(`
            SELECT * FROM comments
            WHERE id = $1;
        `, [commentId]);

        if (result.rows.length === 0) {
            res.status(403).json({ error: "Forbidden" });
            return;
        }
        await pool.query(`
            DELETE FROM comments WHERE id = $1;
        `, [commentId]);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

export default commentRouter;
