import * as vec from './vector';

export interface Circle extends vec.Vector {
  radius: number;
}

/**
 * Distance between two circles (including radius)
 * @param a
 * @param b
 * @returns
 */
export function distance(a: Circle, b: Circle): number {
  return vec.distance(a, b) - a.radius - b.radius;
}

/**
 * Which quadrant of a circle is a given angle
 *
 *              .─────┬─────.
 *           ,─'      │      '─.
 *        ,─╲         │         '╳.
 *       ╱   ╲        │         ╱  ╲
 *     ,'     ╲       │        ╱    `.
 *    ;        ╲      │       ╱       :
 *    ;         ╲     │      ╱        :
 *   ;           ╲    │     ╱          :
 *   │            ╲   │    ╱           │
 *   ├─────────────╳──┼───╳────────────┤
 *   :            ╱   │    ╲           ;
 *    :          ╱    │     ╲         ;
 *    :         ╱     │      ╲        ;
 *     ╲       ╱      │       ╲      ╱
 *      `.    ╱       │        ╲   ,'
 *        ╲  ╱        │         ╲ ╱
 *         '╳.        │        ,─╲
 *            '─.     │     ,─'
 *               `────┴────'
 * @param radians
 * @param quadrants
 * @returns
 */
export function angleToQuadrant(radians: number, quadrants: number): number {
  return Math.floor((radians / (Math.PI * 2)) * quadrants);
}
