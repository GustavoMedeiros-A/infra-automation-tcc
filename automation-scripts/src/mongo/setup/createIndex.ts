import { client } from "../connection/mongoConnection";
import { dbName } from "../utils";

const createIndexes = async () => {
  await client.connect();
  const db = client.db(dbName);
  try {
    await db.collection("orders")
    .createIndex(
      { total: 1, 
        date: 1, 
        items: 1, 
        "items.product_id": 1, 
        "items.quantity": 1 
      });

    await db.collection("products")
    .createIndex({ 
      _id: 1, 
      name: 1, 
      price: 1 
    });
    
    console.log("Indexes created successfully");
  } catch (err) {
    console.error("Error creating indexes:", err);
  } finally {
    await client.close();
  }
};

// await db.collection("products").createIndex({ name: 1 });
// await db.collection("products").createIndex({ price: 1 });
createIndexes();
// await db.collection("orders").createIndex({ date: 1 });
// await db.collection("orders").createIndex({ items: 1 });
// await db.collection("orders").createIndex({ "items.product_id": 1 });
// await db.collection("orders").createIndex({ "items.quantity": 1 });
