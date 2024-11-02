import executeAndMeasureMongo from "../executeAndMeasureMongo";

const query = [{ $match: {} }];

executeAndMeasureMongo(query, "getAllDataMongo");
