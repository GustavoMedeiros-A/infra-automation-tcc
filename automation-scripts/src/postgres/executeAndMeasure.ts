import * as os from "os";
import * as fs from "fs";
import {
  calculateCpuPercent,
  calculateTotalCpuUsage,
  calculateTotalCpuUsageMs,
  calculateTotalCpuUsageSeconds,
  calculateTotalMemoryUsage,
  calculateTotalMemoryUsagepercent,
} from "../utils";
import { client } from "./connection/postgresConnection";

export default async function executeAndMeasure(
  query: string,
  outputPath: string
) {
  await client.connect();

  const startCpuUsage = process.cpuUsage();
  const startMemoryUsage = process.memoryUsage();
  const startTime = Date.now();

  try {
    await client.query(query);
  } catch (error) {
    console.error("Erro ao executar a query:", error);
    return;
  }

  const endTime = Date.now();
  const executionTime = endTime - startTime;
  const endCpuUsage = process.cpuUsage(startCpuUsage);
  const endMemoryUsage = process.memoryUsage();

  const totalCpuUsage = calculateTotalCpuUsage(
    endCpuUsage.user,
    endCpuUsage.system,
    startCpuUsage.user,
    startCpuUsage.system
  );
  const cpuUsagePercent = calculateCpuPercent(totalCpuUsage, executionTime);
  const totalCpuUsageMs = calculateTotalCpuUsageMs(totalCpuUsage);
  const totalCpuUsageSeconds = calculateTotalCpuUsageSeconds(totalCpuUsage);

  const totalSystemMemory = os.totalmem();
  const freeSystemMemory = os.freemem();

  const totalMemoryUsage = calculateTotalMemoryUsage(
    endMemoryUsage.heapUsed,
    startMemoryUsage.heapUsed
  );
  const memoryUsagePercent = calculateTotalMemoryUsagepercent(
    totalMemoryUsage,
    totalSystemMemory
  );

  const results = {
    executionTime,
    totalCpuUsageMs,
    totalCpuUsageSeconds,
    cpuUsagePercent: cpuUsagePercent.toFixed(2),
    totalMemoryUsage,
    memoryUsagePercent: memoryUsagePercent.toFixed(2),
  };

  console.log("Resultados da Medição:", results);

  const directoryPath = "./results";
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  fs.writeFile(
    `./results/${outputPath}`,
    JSON.stringify(results, null, 2),
    (err) => {
      if (err) {
        console.error("Erro ao salvar resultados:", err);
      } else {
        console.log(`Resultados salvos em ${outputPath}`);
      }
    }
  );
}
