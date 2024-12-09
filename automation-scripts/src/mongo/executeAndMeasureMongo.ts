import * as fs from "fs";
import * as os from "os";

import { calculateCpu } from "../utils";
import { client } from "./connection/mongoConnection";
import { dbName } from "./utils";

export default async function executeAndMeasureMongo(
  query: any,
) {
  await client.connect();
  const collection = client.db(dbName).collection("orders");

  const startTime = process.hrtime();
  const startCpu = process.cpuUsage();
  const startMemory = process.memoryUsage().rss;

  try {
    await collection.aggregate(query).toArray();
  } catch (error) {
    console.error("Erro ao executar a query:", error);
    return;
  }
  const endTime = process.hrtime(startTime);
  const endCpu = process.cpuUsage(startCpu);
  const endMemory = process.memoryUsage().rss;

  const executionTime = endTime[0] * 1000 + endTime[1] / 1e6;
  const cpuUsed = calculateCpu(endCpu, executionTime);

  const totalMemory = os.totalmem();
  const memoryUsed = ((endMemory - startMemory) / totalMemory) * 100;

  const results = {
    executionTime,
    cpuUsed,
    memoryUsed,
  };
  
    const directoryPath = "./resultsMongo";
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

  return results;

  // // Define o caminho completo do arquivo com a extensão .json
  // const filePath = `./resultsMongo/${outputPath}.json`;

  // // Grava o arquivo de resultados no caminho especificado
  // fs.writeFile(filePath, JSON.stringify(results, null, 2), (err) => {
  //   if (err) {
  //     console.error("Erro ao salvar resultados:", err);
  //   } else {
  //     console.log(`Resultados salvos em ${filePath}`);
  //   }
  // });
}
