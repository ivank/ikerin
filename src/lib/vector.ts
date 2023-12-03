export interface Vector {
  x: number;
  y: number;
}

export function rotate(vector: Vector, radians: number): Vector {
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return { x: vector.x * cos - vector.y * sin, y: vector.x * sin + vector.y * cos };
}

export function distance(a: Vector, b: Vector): number {
  return Math.hypot(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

export function scale(a: Vector, scale: number) {
  return { x: a.x * scale, y: a.y * scale };
}

export function len(a: Vector) {
  return Math.hypot(a.x, a.y);
}

export function add(...p: Vector[]) {
  let x = 0;
  let y = 0;
  for (const i of p) {
    x += i.x;
    y += i.y;
  }
  return { x, y };
}

export function sub(...p: Vector[]) {
  let x = p[0].x;
  let y = p[0].y;
  for (const i of p.slice(1)) {
    x -= i.x;
    y -= i.y;
  }
  return { x, y };
}

export function dot(a: Vector, b: Vector) {
  return a.x * b.x + a.y * b.y;
}

export function isZero(a: Vector): boolean {
  return a.x === 0 && a.y === 0;
}

export function rotateLeft(a: Vector): Vector {
  return { x: -a.y, y: a.x };
}

export function rotateRight(a: Vector): Vector {
  return { x: a.y, y: -a.x };
}

export function rotateFlip(a: Vector): Vector {
  return { x: -a.y, y: -a.x };
}
