import { client } from "./mongoConnection";

const dbName = "tcc";

const createCollections = async () => {
  try {
    await client.connect();
    const db = client.db(dbName);

    const productCollection = "product";
    const orderCollection = "order";
    const orderItemsCollection = "order_items";

    await db.createCollection(productCollection);
    await db.createCollection(orderCollection);
    await db.createCollection(orderItemsCollection);

    console.log("Collections created successfully.");
  } catch (e) {
    console.error("Error creating collections:", e);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
};

createCollections();
