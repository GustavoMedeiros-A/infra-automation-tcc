import { runMultipleExecutionMongo } from "../../utils";
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
      client: { $first: "$client" },
      date: { $first: "$date" },
      total: { $first: "$total" },
      items: {
        $push: {
          product_id: "$items.product_id",
          quantity: "$items.quantity",
          product_details: "$product_details",
        },
      },
    },
  },
  {
    $project: {
      client: 1,
      date: 1,
      total: 1,
      items: 1,
    },
  },
];

const filePath = `./results/getAllOrderProductsMongo.json`

runMultipleExecutionMongo(query, filePath);