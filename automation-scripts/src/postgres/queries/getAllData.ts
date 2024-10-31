import executeAndMeasure from "../executeAndMeasure";

const outputPath = "getAllData";
const query = 'SELECT * from "order"';

console.log("execute");
executeAndMeasure(query, outputPath);
