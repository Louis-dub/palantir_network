import { Router, type Request, type Response } from "express";
import { pool } from "../db/pool.js";

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

export default commentRouter;
