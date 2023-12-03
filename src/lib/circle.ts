import * as vec from './vector';

export interface Circle extends vec.Vector {
  radius: number;
}

export function distance(a: Circle, b: Circle): number {
  return vec.distance(a, b) - a.radius - b.radius;
}

export function angleToQuadrant(radians: number, quadrants: number): number {
  return Math.floor((radians / (Math.PI * 2)) * quadrants);
}
