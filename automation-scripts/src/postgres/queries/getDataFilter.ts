import executeAndMeasure from "../executeAndMeasure";

const outputPath = "getOrdersByDate";
const query = `SELECT * FROM "order" WHERE date = '2024-01-01'`;

console.log("execute");
executeAndMeasure(query, outputPath);
