import * as fs from "fs";
import * as os from "os";
import { client } from "./connection/postgresConnection";
import { calculateCpu } from "../utils";

export default async function executeAndMeasure(
  query: string,
  outputPath: string
) {
  await client.connect();

  const startTime = process.hrtime();
  const startCpu = process.cpuUsage();
  const startMemory = process.memoryUsage().rss;

  try {
    await client.query(query);
  } catch (error) {
    console.error("Erro ao executar a query:", error);
    return;
  }
  const endTime = process.hrtime(startTime);
  const endCpu = process.cpuUsage(startCpu);
  const endMemory = process.memoryUsage().rss;

  const memoryDifference = endMemory - startMemory;
  const memoryUsedMB = memoryDifference / (1024 * 1024);

  const executionTime = endTime[0] * 1000 + endTime[1] / 1e6;
  const cpuUsed = calculateCpu(endCpu, executionTime);

  const totalMemory = os.totalmem();
  const memoryUsed = ((endMemory - startMemory) / totalMemory) * 100;
  const memoryUsedKB = memoryDifference / 1024;

  const results = {
    executionTime,
    cpuUsed,
    memoryUsed,
    memoryUsedMB,
  };

  console.log("Resultados da Medição:", results);

  const directoryPath = "./results";
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  // Define o caminho completo do arquivo com a extensão .json
  const filePath = `./results/${outputPath}.json`;

  // Grava o arquivo de resultados no caminho especificado
  fs.writeFile(filePath, JSON.stringify(results, null, 2), (err) => {
    if (err) {
      console.error("Erro ao salvar resultados:", err);
    } else {
      console.log(`Resultados salvos em ${filePath}`);
    }
  });
}
