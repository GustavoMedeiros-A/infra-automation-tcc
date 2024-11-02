import os from "os";

interface CpuUsage {
  user: number;
  system: number;
}

export const PRODUTO_COUNT = 100;
export const ORDER_COUNT = 10000;

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

export function calculateCpu(endCpu: CpuUsage, executionTime: number) {
  const cpuCount = os.cpus().length;
  const cpuTime = (endCpu.user + endCpu.system) / 1000 / cpuCount;
  return (cpuTime / executionTime) * 100;
}
