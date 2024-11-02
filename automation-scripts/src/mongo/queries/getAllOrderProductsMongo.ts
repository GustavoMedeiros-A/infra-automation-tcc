import executeAndMeasureMongo from "../executeAndMeasureMongo";
const query = [
  {
    $lookup: {
      from: "products",
      localField: "items",
      foreignField: "_id",
      as: "product_details",
    },
  },
  {
    $project: {
      client: 1,
      date: 1,
      total: 1,
      products: "$product_details",
    },
  },
];

executeAndMeasureMongo(query, "getAllOrderProductsMongo");
