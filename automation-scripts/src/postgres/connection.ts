import { Client } from "pg";

export const client = new Client({
  user: "admin",
  host: "localhost",
  database: "comparation",
  password: "admin",
  port: 5433,
});
