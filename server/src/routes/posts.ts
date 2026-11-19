import { Router, type Request, type Response } from "express";
import { pool } from "../db/pool.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT users.username, posts.content, posts.id, posts.created_at FROM posts
            JOIN users ON users.id = posts.author_id
            ORDER BY posts.created_at DESC;
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/", requireAuth, async (req: Request, res: Response) => {
    const content = req.body.content;

    if (typeof content !== "string"
        || content.trim().length === 0
        || content.length > 256
        || !req.authUserId) {
        res.status(400).json({ error: "Invalid post." });
        return;
    }

    try {
        const result = await pool.query(`
            INSERT INTO posts (author_id, content)
            VALUES ($1, $2)
            RETURNING id, author_id, content, created_at;
        `, [req.authUserId, content]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error "});
    }
});

router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const userId = req.authUserId;

    if (!postId) {
        res.status(400).json({ error: "Post Id is required." });
        return;
    }

    try {
        const post = await pool.query(`
            SELECT * FROM posts
            WHERE id = $1;
        `, [postId]);

        if (post.rows.length === 0 || post.rows[0].author_id !== userId) {
            res.status(403).json({ error: "Forbidden" });
            return;
        }

        await pool.query(`
            DELETE FROM post WHERE id = $1;
        `, [postId]);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

export default router;
