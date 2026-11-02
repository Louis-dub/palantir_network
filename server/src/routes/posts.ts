import { Router, type Request, type Response } from "express";
import { pool } from "../db/pool.js";

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

router.post("/", async (req: Request, res: Response) => {
    const posts = {
        authorId: req.body.authorId,
        content: req.body.content,
    };

    if (!Number.isInteger(posts.authorId) || posts.authorId <= 0
        || typeof posts.content !== "string"
        || posts.content.trim().length === 0
        || posts.content.length > 256) {
        res.status(400).json({ error: "Invalid post." });
        return;
    }

    try {
        const result = await pool.query(`
            INSERT INTO posts (author_id, content)
            VALUES ($1, $2)
            RETURNING id, author_id, content, created_at;
        `, [posts.authorId, posts.content]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error "});
    }
});

export default router;