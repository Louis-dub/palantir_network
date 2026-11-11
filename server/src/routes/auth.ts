import { Router, type Request, type Response } from "express";
import { pool } from "../db/pool.js";
import argon2 from "argon2";

const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        race: req.body.race,
        kingdom: req.body.kingdom,
        profession: req.body.profession,
        house_clan: req.body.house_clan,
    };

    if (typeof user.username !== 'string' || user.username.trim().length < 3 || user.username.length > 30
        || typeof user.password !== 'string' || user.password.length < 12
        || !["Hobbit", "Man", "Elf", "Dwarf", "Istar", "Ent"].includes(user.race)
        || ["Hobbit", "Man", "Elf", "Dwarf"].includes(user.race)
        && (typeof user.house_clan !== 'string' || user.house_clan.length === 0
            || typeof user.kingdom !== 'string' || user.kingdom.length === 0
            || typeof user.profession !== 'string' || user.profession.length === 0)
        || ["Istar", "Ent"].includes(user.race) && (user.house_clan || user.kingdom || user.profession)) {
        res.status(400).json({ error: "Invaid informations." });
        return;
    }

    try {
        const pwdHash = await argon2.hash(user.password, {
            type: argon2.argon2id,
        });

        const result = await pool.query(`
            INSERT INTO users (username, password_hash, race, profession, kingdom, house_clan)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, username, race, kingdom, profession, house_clan, created_at;
        `, [user.username, pwdHash, user.race, user.profession, user.kingdom, user.house_clan]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        if (typeof error === 'object' && error !== null
            && 'code' in error && error.code === "23505") {
            res.status(409).json({ error: "Username already exists." });
        }
        console.error(error);
        res.status(500).json({ error: "Internal server error."});
    }
});

export default authRouter;