import { MongoClient } from "mongodb";

const url = "mongodb://admin:admin@localhost:27017";
export const client = new MongoClient(url);
