import {
  get2024RandomDate,
  getRandomQuantity,
  ORDER_COUNT,
  PRODUTO_COUNT,
} from "../utils";
import { client } from "./postgresConnection";

const generateData = async () => {
  try {
    const products = await generateProducts();
    await generateOrders(products);

    console.log("Data generated successfully");
  } catch (err) {
    console.error("Error to generate:", err);
  }
};

const truncateTables = async () => {
  await client.query(
    'TRUNCATE TABLE product, "order", order_items RESTART IDENTITY CASCADE'
  );
};

const generateProducts = async () => {
  const products = [];
  const productCount = PRODUTO_COUNT;

  for (let i = 0; i < productCount; i++) {
    const name = `Product ${i + 1}`;
    const price = Math.floor(Math.random() * 1000) + 1;

    const result = await client.query(
      `INSERT INTO product (name, price) VALUES ($1, $2) RETURNING id`,
      [name, price]
    );

    const productId = result.rows[0].id;
    products.push({ id: productId, name, price });
  }

  return products;
};

const generateOrders = async (products: any[]) => {
  const orderCount = ORDER_COUNT;

  for (let i = 0; i < orderCount; i++) {
    const clientName = `Client ${i + 1}`;
    const orderDate = get2024RandomDate();

    const orderResult = await client.query(
      `INSERT INTO "order" (client, date) VALUES ($1, $2) RETURNING id`,
      [clientName, orderDate]
    );

    const orderId = orderResult.rows[0].id;

    //Quantidade aletória de items
    const itemCount = Math.floor(Math.random() * 10) + 1;
    for (let j = 0; j < itemCount; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = getRandomQuantity();

      await client.query(
        `INSERT INTO order_items (product_id, order_id, quantity) VALUES ($1, $2, $3)`,
        [product.id, orderId, quantity]
      );
    }
  }
};

const insert = async () => {
  try {
    await client.connect();
    await truncateTables();

    await generateData();
  } catch (err) {
    console.log("error", err);
  } finally {
    await client.end();
  }
};

insert();
