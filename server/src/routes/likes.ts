import { Router, type Request, type Response } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { pool } from "../db/pool.js";

const likesRouter = Router();

likesRouter.get("/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;

    if (!userId) {
        res.status(400).json({ error: "User Id is required." });
        return;
    }

    try {
        const result = await pool.query(`
            SELECT id, user_id, post_id FROM likes
            WHERE user_id = $1;
        `, [userId]);

        res.status(201).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Invalide internal error." });
    }
});

likesRouter.post("/:id", requireAuth, async (req: Request, res: Response) => {
    const postId = req.params.id;
    const userId = req.authUserId;

    if (!postId) {
        res.status(400).json({ error: "Post Id is required." });
        return;
    }

    try {
        const result = await pool.query(`
            INSERT INTO likes (user_id, post_id)
            VALUES ($1, $2)
            RETURNING id, user_id, post_id;
        `, [userId, postId]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

export default likesRouter;
