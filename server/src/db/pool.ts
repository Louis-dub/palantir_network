import { config } from "dotenv";
import { resolve } from "node:path";
import { Pool } from "pg";

const envPath = resolve(process.cwd(), "../.env");
const result = config({ path: envPath });

if (result.error)
    throw result.error;

const password = process.env.POSTGRES_PASSWORD;

if (!password)
    throw new Error("POSTGRES_PASSWORD is missing from the root .env file");

const pool = new Pool({
    host: "localhost",
    port: 5433,
    database: "commonroom",
    user: "commonroom",
    password,
});

export { pool };