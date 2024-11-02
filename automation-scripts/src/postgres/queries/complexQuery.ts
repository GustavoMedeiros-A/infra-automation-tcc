import executeAndMeasure from "../executeAndMeasure";

const outputPath = "complexQuery";
const query = `
  SELECT 
    o.id AS order_id,
    o.client,
    o.date,
    SUM(p.price * oi.quantity) AS total_value,
    COUNT(oi.product_id) AS total_products
  FROM 
    "order" AS o
  JOIN 
    order_items AS oi ON o.id = oi.order_id
  JOIN 
    product AS p ON oi.product_id = p.id
  GROUP BY 
    o.id, o.client, o.date
  HAVING 
    SUM(p.price * oi.quantity) > 1000 AND COUNT(oi.product_id) >= 5
  ORDER BY 
    total_value DESC, total_products DESC;
`;

console.log("execute");
executeAndMeasure(query, outputPath);
