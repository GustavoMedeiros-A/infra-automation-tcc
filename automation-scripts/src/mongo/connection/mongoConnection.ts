import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL;
if (!url) {
  throw new Error("MONGO_URL is not defined in the environment variables.");
}
export const client = new MongoClient(url);
