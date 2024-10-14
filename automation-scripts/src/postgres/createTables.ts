import { client } from "./postgresConnection";

const genericCreateTable = async (tableName: string) => {
  try {
    const productTable = `CREATE TABLE IF NOT EXISTS ${tableName}_product (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            price DECIMAL(10, 2) NOT NULL
        )`;

    const orderTable = `CREATE TABLE IF NOT EXISTS ${tableName}_order (
            id SERIAL PRIMARY KEY,
            client VARCHAR(255) NOT NULL,
            date TIMESTAMP NOT NULL
        )`;

    const orderItensTable = `CREATE TABLE IF NOT EXISTS ${tableName}_order_items (
            id SERIAL PRIMARY KEY,
            quantity INT NOT NULL,
            product_id INT REFERENCES ${tableName}_product(id),
            order_id INT REFERENCES ${tableName}_order(id)
        )`;

    await client.query(productTable);
    await client.query(orderTable);
    await client.query(orderItensTable);
  } catch (e) {
    console.error("Error creating tables:", e);
  }
};

const createTable = async () => {
  try {
    await client.connect();
    await genericCreateTable("small");
    await genericCreateTable("medium");
    await genericCreateTable("large");
  } catch (err) {
    console.log("error", err);
  } finally {
    await client.end();
  }
};

createTable();
