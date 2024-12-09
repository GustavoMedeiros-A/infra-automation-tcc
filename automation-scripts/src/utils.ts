import os from "os";
import * as fs from "fs";
import executeAndMeasure from "./postgres/executeAndMeasure";
import { client } from "./postgres/connection/postgresConnection";
import executeAndMeasureMongo from "./mongo/executeAndMeasureMongo";
interface CpuUsage {
  user: number;
  system: number;
}

export const PRODUTO_COUNT = 1000;
export const ORDER_COUNT = 1000;

export function get2024RandomDate(): Date {
  const start = new Date(2024, 0, 1);
  const end = new Date(2024, 11, 31);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export function getRandomQuantity(): number {
  return Math.floor(Math.random() * 100) + 1;
}

let startCpu: CpuUsage = {system: 0, user: 0};
let executionTime = 0


// Execução da Query
const endCpu = process.cpuUsage(startCpu);
calculateCpu(endCpu, executionTime);

export function calculateCpu(endCpu: CpuUsage, executionTime: number) {
  const cpuCount = os.cpus().length;
  const cpuTime = (endCpu.user + endCpu.system) / 1000 / cpuCount;
  return (cpuTime / executionTime) * 100;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function runMultipleExecution(query: string, outputFileName: string) {
  const allResults = []; 
  await client.connect();

  for (let i = 1; i <= 10; i++) {
    const result = await executeAndMeasure(query);

    allResults.push({
      run: i,
      result,
    });

    if (i < 10) {
      console.log(`Aguardando 2 segundos antes da próxima execução...`);
      await delay(2000);
    }
  }
  const formatFileName = `${outputFileName}_${ORDER_COUNT}`

  fs.writeFile(formatFileName, JSON.stringify(allResults, null, 2), (err) => {
    if (err) {
      console.error("Erro ao salvar resultados:", err);
    } else {
      console.log(`Todos os resultados salvos em ${outputFileName}`);
    }
  });

  console.log("Execuções concluídas!");
}



export async function runMultipleExecutionMongo(query: any, outputFileName: string) {
  const allResults = []; 
  await client.connect();

  for (let i = 1; i <= 10; i++) {
    const result = await executeAndMeasureMongo(query);

    allResults.push({
      run: i,
      result,
    });

    if (i < 10) {
      console.log(`Aguardando 2 segundos antes da próxima execução...`);
      await delay(2000);
    }
  }
  const formatFileName = `${outputFileName}_${ORDER_COUNT}`

  fs.writeFile(formatFileName, JSON.stringify(allResults, null, 2), (err) => {
    if (err) {
      console.error("Erro ao salvar resultados:", err);
    } else {
      console.log(`Todos os resultados salvos em ${outputFileName}`);
    }
  });

  console.log("Execuções concluídas!");
}