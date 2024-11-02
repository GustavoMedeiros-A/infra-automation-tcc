import executeAndMeasureMongo from "../executeAndMeasureMongo";

const query = [
  {
    $match: {
      total: { $gt: 1000 },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
];

const outputPath = "getOrdersByTotalValueDescMongo";
console.log("execute");
executeAndMeasureMongo(query, outputPath);
