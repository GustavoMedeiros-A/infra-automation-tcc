import {
  get2024RandomDate,
  getRandomQuantity,
  ORDER_COUNT,
  PRODUTO_COUNT,
} from "../../utils";
import { client } from "../connection/mongoConnection";

let dbName = "tcc";

const generateData = async () => {
  try {
    const products = await generateProducts();
    await generateOrders(products);

    console.log("Data generated successfully");
  } catch (err) {
    console.error("Error generating data:", err);
  }
};

const clearCollections = async () => {
  await client.db(dbName).collection("products").deleteMany({});
  await client.db(dbName).collection("orders").deleteMany({});
};

const generateProducts = async () => {
  const products = [];
  const productCount = PRODUTO_COUNT;

  for (let i = 0; i < productCount; i++) {
    const name = `Product ${i + 1}`;
    const price = Math.floor(Math.random() * 1000) + 1;

    const result = await client
      .db(dbName)
      .collection("products")
      .insertOne({ name, price });

    const productId = result.insertedId;
    products.push({ id: productId, name, price });
  }

  return products;
};

const generateOrders = async (products: any[]) => {
  const orderCount = ORDER_COUNT;

  for (let i = 0; i < orderCount; i++) {
    const clientName = `Client ${i + 1}`;
    const orderDate = get2024RandomDate();
    const items = [];
    let totalValue = 0;

    const itemCount = Math.floor(Math.random() * 10) + 1;
    for (let j = 0; j < itemCount; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = getRandomQuantity();
      const itemTotal = product.price * quantity;
      totalValue += itemTotal;

      items.push({ product_id: product.id, quantity });
    }

    await client.db(dbName).collection("orders").insertOne({
      client: clientName,
      date: orderDate,
      items,
      total: totalValue,
    });
  }
};

const insert = async () => {
  try {
    await client.connect();
    await clearCollections();

    await generateData();
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
};

insert();
