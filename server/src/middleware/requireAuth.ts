import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JsonWebTokenError } from "jsonwebtoken";

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
    const auth = req.get("Authorization");

    if (!auth || !auth.startsWith("Bearer ")) {
        res.status(401).json({ error: "Authentication required." });
        return;
    }

    const token = auth.slice("Bearer ".length);
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        console.error("JWT_SECRET is missing.");
        res.status(500).json({ error: "JWT_SECRET is missing" });
        return;
    }

    try {
        const check = jwt.verify(token, jwtSecret, { algorithms: ["HS256"] });

        if (!check || typeof check !== "object" || typeof check.sub !== "string") {
            res.status(401).json({ error: "Invalid or expired token." });
            return;
        }
        const sub = Number(check.sub);
        if (!Number.isSafeInteger(sub) || sub <= 0) {
            res.status(401).json({ error: "Invalid or expired token." });
            return;
        }
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            res.status(401).json({ error: "Invalid or expired token." });
            return;
        }
        console.error(error);
        res.status(500).json({ error: "Internal server errror." });
    }
}