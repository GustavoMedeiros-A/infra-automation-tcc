import { runMultipleExecutionMongo } from "../../utils";
import { client } from "../connection/mongoConnection";
import executeAndMeasureMongo from "../executeAndMeasureMongo";

const query = [{ $match: {} }];
client.db().collection("orders").aggregate(query);


const filePath = `./resultsMongo/getAllDataMongo.json`

runMultipleExecutionMongo(query, filePath);