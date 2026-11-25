import { Router, type Request, type Response } from "express";
import { pool } from "../db/pool.js";

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
    const username = req.body.username;

    if (!username) {
        res.status(400).json({ error: "Username is required." });
        return;
    }

    try {
        const result = await pool.query(`
            SELECT id, username, race, kingdom, profession, house_clan FROM users
            WHERE username = $1;
        `, [username]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: `User ${username} not found.` });
            return;
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

export default userRouter;
