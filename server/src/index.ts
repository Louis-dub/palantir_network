import express from "express";
import type { Request, Response } from "express";
import { pool } from "./db/pool.js";

const app = express();

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "ok",
        app: "CommonRoom"
    });
});

app.get("/api/posts", async (req: Request, res: Response) => {
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

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});