export interface Pos {
  x: number;
  y: number;
}

export interface Rect extends Pos {
  width: number;
  height: number;
}

export interface Circle extends Pos {
  radius: number;
}

export interface Line {
  from: Pos;
  to: Pos;
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

export function circleDistance(a: Circle, b: Circle): number {
  return distance(a, b) - a.radius - b.radius;
}

export function extrudeRect(rect: Rect, width: number, height: number): Rect {
  return { x: rect.x - width, y: rect.y - height, width: rect.width + width * 2, height: rect.height + height * 2 };
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

export function approach(value: number, current: number, nudge: number, cutoff: number): number {
  const distance = value - current;
  return Math.abs(distance) < cutoff ? value : current + distance * nudge;
}

export function circleRectIntersecting(circle: Circle, rect: Rect): boolean {
  return (
    circle.x > rect.x - circle.radius &&
    circle.x < rect.x + rect.width + circle.radius &&
    circle.y > rect.y - circle.radius &&
    circle.y < rect.y + rect.height + circle.radius
  );
}

export function pointRectIntersecting(point: Rect, rect: Rect): boolean {
  return point.x > rect.x && point.x < rect.x + rect.width && point.y > rect.y && point.y < rect.y + rect.height;
}

export function lineCircleIntersecting(line: Line, circle: Circle) {
  const dx = line.to.x - line.from.x;
  const dy = line.to.y - line.from.y;
  const ex = circle.x - line.from.x;
  const ey = circle.y - line.from.y;
  const dotProduct = ex * dx + ey * dy;

  let closestX: number, closestY: number;

  if (dotProduct <= 0) {
    closestX = line.from.x;
    closestY = line.from.y;
  } else if (dotProduct >= dx * dx + dy * dy) {
    closestX = line.to.x;
    closestY = line.to.y;
  } else {
    const t = dotProduct / (dx * dx + dy * dy);
    closestX = line.from.x + t * dx;
    closestY = line.from.y + t * dy;
  }

  const distanceSquared = (circle.x - closestX) ** 2 + (circle.y - closestY) ** 2;
  return distanceSquared <= circle.radius ** 2;
}

export function angleToQuadrant(radians: number, quadrants: number): number {
  return Math.floor((radians / (Math.PI * 2)) * quadrants);
}
