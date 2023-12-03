import { type Circle } from './circle';
import { type Vector } from './vector';

export interface Rect extends Vector {
  width: number;
  height: number;
}

export function extrude(rect: Rect, width: number, height: number): Rect {
  return { x: rect.x - width, y: rect.y - height, width: rect.width + width * 2, height: rect.height + height * 2 };
}

export function isIntersecting(r1: Rect, r2: Rect): boolean {
  return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
}

export function isIntersectingCircle(circle: Circle, rect: Rect): boolean {
  return (
    circle.x > rect.x - circle.radius &&
    circle.x < rect.x + rect.width + circle.radius &&
    circle.y > rect.y - circle.radius &&
    circle.y < rect.y + rect.height + circle.radius
  );
}
