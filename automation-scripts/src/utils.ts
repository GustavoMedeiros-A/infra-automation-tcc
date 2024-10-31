export function getRandomQuantity(): number {
  return Math.floor(Math.random() * 10) + 1;
}

export function get2024RandomDate(): Date {
  const start = new Date("2024-01-01");
  const end = new Date("2024-12-31");
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export const ORDER_COUNT = 500;
export const PRODUTO_COUNT = 100;

// TODO ENTENDER PORQUE OS VALORES DE % TÂO VINDO ACIMA DE 100%
import * as os from "os";

export function toFixedAndParseFloat(value: number) {
  return parseFloat(value.toFixed(2));
}

export function convertBytesToGigabytes(number: number) {
  return toFixedAndParseFloat(number / (1024 * 1024 * 1024));
}

export function calculateTotalCpuUsage(
  endCpuUsageUser: number,
  endCpuUsageSystem: number,
  startCpuUsageUser: number,
  startCpuUsageSystem: number
): number {
  return Math.abs(
    endCpuUsageUser +
      endCpuUsageSystem -
      (startCpuUsageUser + startCpuUsageSystem)
  );
}

export function calculateCpuPercent(
  totalCpuUsage: number,
  executionTime: number
): number {
  const numberOfCores = os.cpus().length;
  return (totalCpuUsage / (executionTime * 1000 * numberOfCores)) * 100;
}

export function calculateTotalCpuUsageMs(totalCpuUsage: number): number {
  return totalCpuUsage / 1000;
}

export function calculateTotalCpuUsageSeconds(totalCpuUsage: number): number {
  return totalCpuUsage / 1000000;
}

export function calculateTotalMemoryUsage(
  endMemoryUsage: number,
  startMemoryUsage: number
): number {
  return Math.abs(endMemoryUsage - startMemoryUsage);
}

export function calculateTotalMemoryUsagepercent(
  totalMemoryUsage: number,
  totalSystemMemory: number
): number {
  return (totalMemoryUsage / totalSystemMemory) * 100;
}
