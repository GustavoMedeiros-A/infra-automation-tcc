import { runMultipleExecution, runMultipleExecutionMongo } from "../../utils";
import executeAndMeasureMongo from "../executeAndMeasureMongo";

const query = [
  {
    $unwind: "$items", 
  },
  {
    $lookup: {
      from: "products",
      localField: "items.product_id",
      foreignField: "_id",
      as: "product_details",
    },
  },
  {
    $unwind: "$product_details", 
  },
  {
    $group: {
      _id: "$_id",
      order_id: { $first: "$_id" },
      client: { $first: "$client" },
      date: { $first: "$date" },
      total_value: {
        $sum: { $multiply: ["$product_details.price", "$items.quantity"] },
      },
      total_products: { $sum: "$items.quantity" }, 
    },
  },
  {
    $match: {
      total_value: { $gt: 1000 },
      total_products: { $gte: 5 },
    },
  },
  {
    $sort: { total_value: -1, total_products: -1 },
  },
];

const outputPath = "complexQueryMongo";
const filePath = `./results/${outputPath}.json`

runMultipleExecutionMongo(query, filePath);
