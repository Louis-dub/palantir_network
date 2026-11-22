import { Router, type Request, type Response } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { pool } from "../db/pool.js";

const likesRouter = Router();

likesRouter.post("/api/likes/:id", requireAuth, async (req: Request, res: Response) => {
    const postId = req.params.id;
    const userId = req.authUserId;

    if (!postId) {
        res.status(400).json({ error: "Post Id is required." });
        return;
    }

    try {
        const response = await pool.query(`
            INSERT INTO likes (user_id, post_id)
            VALUE $1, $2;
        `);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. "});
    }
});
