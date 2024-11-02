import { client } from "../connection/postgresConnection";

const createTables = async () => {
  try {
    await client.connect();

    const productTable = `
      CREATE TABLE IF NOT EXISTS product (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      )`;

    const orderTable = `
      CREATE TABLE IF NOT EXISTS "order" (
        id SERIAL PRIMARY KEY,
        client VARCHAR(255) NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        date TIMESTAMP NOT NULL
      )`;

    const orderItemsTable = `
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        quantity INT NOT NULL,
        product_id INT REFERENCES product(id),
        order_id INT REFERENCES "order"(id)
      )`;

    await client.query(productTable);
    await client.query(orderTable);
    await client.query(orderItemsTable);

    console.log("Tables created successfully.");
  } catch (e) {
    console.error("Error creating tables:", e);
  } finally {
    await client.end();
  }
};

createTables();
