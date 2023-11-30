export interface Pos {
  x: number;
  y: number;
}

export interface Rect extends Pos {
  width: number;
  height: number;
}

export interface Line {
  from: Pos;
  to: Pos;
}

export interface Motion {
  speed: number;
  acceleration: number;
  deceleration: number;
  topSpeed: number;
}

export function decelerate(motion: Motion): number {
  return Math.max(0, motion.speed - motion.deceleration);
}

export function accelerate(motion: Motion): number {
  return Math.min(motion.topSpeed, motion.speed + motion.acceleration);
}

export function rotateVector(vector: Pos, radians: number): Pos {
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return { x: vector.x * cos - vector.y * sin, y: vector.x * sin + vector.y * cos };
}

export function randBetween<T>(from: T[]): T {
  return from[Math.floor(Math.random() * from.length)];
}

export function distance(a: Pos, b: Pos): number {
  return Math.hypot(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

export function translatePos(a: Pos, b: Pos): Pos {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function rand(from: number, to?: number): number {
  return to === undefined ? Math.random() * from : from + Math.random() * (to - from);
}

export function lineIntersecting(a: Line, b: Line) {
  const det = (a.to.x - a.from.x) * (b.to.y - b.from.y) - (b.to.x - b.from.x) * (a.to.y - a.from.y);
  if (det === 0) {
    return false;
  } else {
    const lambda = ((b.to.y - b.from.y) * (b.to.x - a.from.x) + (b.from.x - b.to.x) * (b.to.y - a.from.y)) / det;
    const gamma = ((a.from.y - a.to.y) * (b.to.x - a.from.x) + (a.to.x - a.from.x) * (b.to.y - a.from.y)) / det;
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  }
}

export function rectIntersecting(r1: Rect, r2: Rect): boolean {
  return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
}
