import os, { CpuInfo } from "os";

interface CpuUsage {
  user: number;
  system: number;
}

export function calculateCpu(endCpu: CpuUsage, executionTime: number) {
  const cpuCount = os.cpus().length;
  const cpuTime = (endCpu.user + endCpu.system) / 1000 / cpuCount;
  return (cpuTime / executionTime) * 100;
}
