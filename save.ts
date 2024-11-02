// import * as fs from "fs";
// import * as os from "os";
// import { client } from "./connection/postgresConnection";
// import { execSync } from "child_process";

// const getProcessStats = () => {
//   try {
//     const stats = execSync(`ps -p ${process.pid} -o %cpu,%mem`);
//     const [cpu, mem] = stats.toString().split("\n")[1].trim().split(/\s+/);
//     console.log("Estatísticas capturadas - CPU:", cpu, "Memória:", mem);
//     return {
//       cpu: parseFloat(cpu),
//       memory: parseFloat(mem),
//     };
//   } catch (error) {
//     console.error("Erro ao capturar estatísticas do sistema:", error);
//     return { cpu: 0, memory: 0 };
//   }
// };

// export default async function executeAndMeasure(
//   query: string,
//   outputPath: string
// ) {
//   await client.connect();

//   let cpuCount = os.cpus().length;

//   // Captura as estatísticas iniciais de CPU e memória
//   const initialStats = getProcessStats();
//   const startTime = process.hrtime();
//   const startMemory = process.memoryUsage().rss;

//   // Inicializa midStats para evitar erro de tipo
//   let midStats = { cpu: initialStats.cpu, memory: initialStats.memory };
//   try {
//     // Captura uma medição intermediária durante a execução da query
//     setTimeout(() => {
//       midStats = getProcessStats();
//     }, 50); // Captura uma medição 50ms após o início da query

//     await client.query(query);
//   } catch (error) {
//     console.error("Erro ao executar a query:", error);
//     return;
//   }

//   // Captura as estatísticas finais de CPU e memória
//   const finalStats = getProcessStats();
//   const endTime = process.hrtime(startTime);
//   const endMemory = process.memoryUsage().rss;

//   const executionTime = endTime[0] * 1000 + endTime[1] / 1e6; // Em ms

//   // Calcula a média de CPU entre as medições inicial, intermediária e final
//   const cpuUsed =
//     (initialStats.cpu + midStats.cpu + finalStats.cpu) / 3 / cpuCount;
//   const memoryDifference = endMemory - startMemory;
//   const memoryUsedMB = memoryDifference / (1024 * 1024);
//   const totalMemory = os.totalmem();
//   const memoryUsedPercentage = (memoryDifference / totalMemory) * 100;

//   const results = {
//     executionTime, // Em ms
//     cpuUsed, // Média de CPU em %
//     memoryUsedPercentage, //Média da memória em %
//     memoryUsedMB, // Memória usada em MB
//   };

//   console.log("Resultados da Medição:", results);

//   const directoryPath = "./results";
//   if (!fs.existsSync(directoryPath)) {
//     fs.mkdirSync(directoryPath);
//   }

//   const filePath = `./results/${outputPath}`;
//   if (!fs.existsSync(filePath)) {
//     fs.mkdirSync(filePath);
//   }

//   fs.writeFile(
//     `./results/${outputPath}`,
//     JSON.stringify(results, null, 2),
//     (err) => {
//       if (err) {
//         console.error("Erro ao salvar resultados:", err);
//       } else {
//         console.log(`Resultados salvos em ${outputPath}`);
//       }
//     }
//   );
// }
