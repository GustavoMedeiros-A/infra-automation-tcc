import { get2024RandomDate, getRandomQuantity } from "../utils";
import { client } from "./mongoConnection";

const generateData = async (recordCount: number, collectionName: string) => {
  try {
    const products = await generateProducts(recordCount, collectionName);
    await generateOrders(products, recordCount, collectionName);

    console.log("Data generated successfully");
  } catch (err) {
    console.error("Error generating data:", err);
  }
};

const clearCollections = async () => {
  await client.db().collection("small_products").deleteMany({});
  await client.db().collection("small_orders").deleteMany({});
  await client.db().collection("small_order_items").deleteMany({});
  await client.db().collection("medium_products").deleteMany({});
  await client.db().collection("medium_orders").deleteMany({});
  await client.db().collection("medium_order_items").deleteMany({});
  await client.db().collection("large_products").deleteMany({});
  await client.db().collection("large_orders").deleteMany({});
  await client.db().collection("large_order_items").deleteMany({});
};

const generateProducts = async (
  recordCount: number,
  collectionName: string
) => {
  const products = [];
  const productCount = Math.floor(recordCount * 0.1);

  for (let i = 0; i < productCount; i++) {
    const name = `Product ${i + 1}`;
    const price = Math.floor(Math.random() * 1000) + 1;

    const result = await client
      .db()
      .collection(`${collectionName}_products`)
      .insertOne({ name, price });

    const productId = result.insertedId;
    products.push({ id: productId, name, price });
  }

  return products;
};

const generateOrders = async (
  products: any[],
  recordCount: number,
  collectionName: string
) => {
  for (let i = 0; i < recordCount; i++) {
    const clientName = `Client ${i + 1}`;
    const orderDate = get2024RandomDate();
    const items = [];

    const itemCount = Math.floor(Math.random() * 10) + 1;
    for (let j = 0; j < itemCount; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = getRandomQuantity();
      items.push({ product, quantity });
    }

    await client
      .db()
      .collection(`${collectionName}_orders`)
      .insertOne({ client: clientName, date: orderDate, items });
  }
};

const insert = async () => {
  try {
    await client.connect();
    await clearCollections();

    await generateData(1000, "small");
    await generateData(2000, "medium");
    await generateData(3000, "large");
  } catch (err) {
    console.log("error", err);
  } finally {
    await client.close();
  }
};

insert();
