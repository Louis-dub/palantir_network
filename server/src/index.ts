import express from "express";
import type { Request, Response } from "express";

const app = express();

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "ok",
        app: "CommonRoom"
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});