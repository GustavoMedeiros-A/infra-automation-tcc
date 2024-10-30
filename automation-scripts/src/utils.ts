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
