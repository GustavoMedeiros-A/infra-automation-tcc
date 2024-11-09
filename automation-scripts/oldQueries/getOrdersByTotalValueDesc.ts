import executeAndMeasure from "../src/postgres/executeAndMeasure";

const outputPath = "getOrdersByTotalValueDesc";
const query = `
  SELECT *
  FROM "order"
  WHERE total > 1000
  ORDER BY total DESC;
`;

console.log("execute");
executeAndMeasure(query, outputPath);
