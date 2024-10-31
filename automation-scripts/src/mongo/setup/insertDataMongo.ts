import {
  get2024RandomDate,
  getRandomQuantity,
  ORDER_COUNT,
  PRODUTO_COUNT,
} from "../../utils";
import { client } from "../connection/mongoConnection";

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
  await client.db().collection("products").deleteMany({});
  await client.db().collection("orders").deleteMany({});
  await client.db().collection("order_items").deleteMany({});
};

const generateProducts = async () => {
  const products = [];
  const productCount = PRODUTO_COUNT;

  for (let i = 0; i < productCount; i++) {
    const name = `Product ${i + 1}`;
    const price = Math.floor(Math.random() * 1000) + 1;

    const result = await client
      .db()
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

    const itemCount = Math.floor(Math.random() * 10) + 1;
    for (let j = 0; j < itemCount; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = getRandomQuantity();
      items.push({ product_id: product.id, quantity });
    }

    await client.db().collection("orders").insertOne({
      client: clientName,
      date: orderDate,
      items,
    });
  }
};

const insert = async () => {
  try {
    await client.connect();
    await clearCollections();

    await generateData(); // Gera a quantidade fixa de dados
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
};

insert();
