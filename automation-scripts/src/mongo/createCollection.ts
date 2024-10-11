import { MongoClient } from "mongodb";

const url = "mongodb://admin:admin@localhost:27017";
const client = new MongoClient(url);

const dbName = "comparation";

const genericCreateCollection = async (collectionName: string) => {
  try {
    const db = client.db(dbName);

    const productCollection = `${collectionName}_product`;
    const orderCollection = `${collectionName}_order`;
    const orderItemsCollection = `${collectionName}_order_items`;

    await db.createCollection(productCollection);
    await db.createCollection(orderCollection);
    await db.createCollection(orderItemsCollection);

    console.log(
      `Collections for ${collectionName} created and sample data inserted.`
    );
  } catch (e) {
    console.error(`Error creating collections for ${collectionName}:`, e);
  }
};

const createCollections = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    await genericCreateCollection("small");
    await genericCreateCollection("medium");
    await genericCreateCollection("large");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
};

createCollections();
