import { runMultipleExecution } from "../../utils";

const outputPath = "getAllData";
const query = 'SELECT * from "order"';
const filePath = `./results/${outputPath}.json`

runMultipleExecution(query, filePath);
