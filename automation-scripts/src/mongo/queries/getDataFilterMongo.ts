import executeAndMeasureMongo from "../executeAndMeasureMongo";

const query = [
  {
    $match: {
      date: new Date("2024-01-01"),
    },
  },
];

const outputPath = "getOrdersByDateMongo";
console.log("Executing query to retrieve orders by date...");
executeAndMeasureMongo(query, outputPath);
