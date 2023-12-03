export function rand(from: number, to?: number): number {
  return to === undefined ? Math.random() * from : from + Math.random() * (to - from);
}

export function randBetween<T>(from: T[]): T {
  return from[Math.floor(Math.random() * from.length)];
}
