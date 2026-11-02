import express from "express";
import type { Request, Response } from "express";
import postsRouter from "./routes/posts.js";

const app = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "ok",
        app: "CommonRoom"
    });
});

app.use("/api/posts", postsRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});