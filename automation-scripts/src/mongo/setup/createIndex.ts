import { client } from "../connection/mongoConnection";
import { dbName } from "../utils";

const createIndexes = async () => {
  await client.connect();
  const db = client.db(dbName);
  try {
    await db.collection("orders").createIndex({ total: 1 });
    await db.collection("orders").createIndex({ date: 1 });

    await db.collection("products").createIndex({ _id: 1 });

    console.log("Indexes created successfully");
  } catch (err) {
    console.error("Error creating indexes:", err);
  } finally {
    await client.close();
  }
};

createIndexes();
