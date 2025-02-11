// src/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
// import { config } from "dotenv";

// config({ path: ".env" }); // or .env.local

import ws from "ws";
neonConfig.webSocketConstructor = ws;

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// neonConfig.poolQueryViaFetch = true

// const sql = neon(process.env.DATABASE_URL);

// export const db = drizzle({ client: sql });
