import executeAndMeasure from "../executeAndMeasure";

const outputPath = "getProductCountByOrder";
const query = `
  SELECT oi.order_id, COUNT(oi.product_id) AS total_products
  FROM order_items AS oi
  GROUP BY oi.order_id;
`;

console.log("execute");
executeAndMeasure(query, outputPath);
