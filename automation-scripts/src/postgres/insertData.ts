import { get2024RandomDate, getRandomQuantity } from "../utils";
import { client } from "./connection";

const generateData = async (recordCount: number, tableName: string) => {
  try {
    const products = await generateProducts(recordCount, tableName);
    await generateOrders(products, recordCount, tableName);

    console.log("Data generated successfully");
  } catch (err) {
    console.error("Error to generate:", err);
  }
};

const truncateTables = async () => {
  await client.query(
    "TRUNCATE TABLE small_product, small_order, small_order_items RESTART IDENTITY CASCADE"
  );
  await client.query(
    "TRUNCATE TABLE medium_product, medium_order, medium_order_items RESTART IDENTITY CASCADE"
  );
  await client.query(
    "TRUNCATE TABLE large_product, large_order, large_order_items RESTART IDENTITY CASCADE"
  );
};

const generateProducts = async (recordCount: number, tableName: string) => {
  const products = [];
  const productCount = Math.floor(recordCount * 0.1);

  for (let i = 0; i < productCount; i++) {
    const name = `Product ${i + 1}`;
    const price = Math.floor(Math.random() * 1000) + 1;
    console.log(`${tableName}_product`);
    const result = await client.query(
      `INSERT INTO ${tableName}_product (name, price) VALUES ($1, $2) RETURNING id`,
      [name, price]
    );

    const productId = result.rows[0].id;
    products.push({ id: productId, name, price });
  }

  return products;
};

const generateOrders = async (
  products: any[],
  recordCount: number,
  tableName: string
) => {
  for (let i = 0; i < recordCount; i++) {
    const clientName = `Client ${i + 1}`;
    const orderDate = get2024RandomDate();

    const orderResult = await client.query(
      `INSERT INTO ${tableName}_order (client, date) VALUES ($1, $2) RETURNING id`,
      [clientName, orderDate]
    );

    const orderId = orderResult.rows[0].id;

    const itemCount = Math.floor(Math.random() * 10) + 1;
    for (let j = 0; j < itemCount; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = getRandomQuantity();

      await client.query(
        `INSERT INTO ${tableName}_order_items (product_id, order_id, quantity) VALUES ($1, $2, $3)`,
        [product.id, orderId, quantity]
      );
    }
  }
};

const insert = async () => {
  try {
    await client.connect();
    await truncateTables();

    await generateData(1000, "small");
    await generateData(2000, "medium");
    await generateData(3000, "large");
  } catch (err) {
    console.log("error", err);
  } finally {
    await client.end();
  }
};

insert();
