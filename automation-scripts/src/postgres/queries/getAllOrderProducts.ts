import executeAndMeasure from "../executeAndMeasure";

const outputPath = "getAllOrderProducts";
const query = `
  SELECT o.*, p.*
  FROM "order" AS o
  JOIN order_items AS oi ON o.id = oi.order_id
  JOIN product AS p ON oi.product_id = p.id;
`;

console.log("execute");
executeAndMeasure(query, outputPath);