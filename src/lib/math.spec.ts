import { expect, test } from 'vitest';
import {
  rectIntersecting,
  distance,
  lineIntersecting,
  lineCircleIntersecting,
  pointRectIntersecting,
  circleRectIntersecting,
  approach,
  circleDistance,
  angleToQuadrant,
} from './math';

test.each`
  r1                                           | r2                                       | expected
  ${{ x: 0, y: 0, width: 10, height: 10 }}     | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${true}
  ${{ x: -15, y: 0, width: 10, height: 10 }}   | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
  ${{ x: -15, y: -50, width: 10, height: 10 }} | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
  ${{ x: 0, y: -50, width: 10, height: 10 }}   | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
  ${{ x: 5, y: 5, width: 10, height: 10 }}     | ${{ x: 0, y: 0, width: 40, height: 40 }} | ${true}
  ${{ x: 30, y: 30, width: 20, height: 20 }}   | ${{ x: 0, y: 0, width: 40, height: 40 }} | ${true}
  ${{ x: 30, y: 50, width: 20, height: 20 }}   | ${{ x: 0, y: 0, width: 40, height: 40 }} | ${false}
  ${{ x: 5, y: 0, width: 10, height: 10 }}     | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${true}
  ${{ x: 11, y: 0, width: 10, height: 10 }}    | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
`('rectIntersecting($r1, $r2) -> $expected', ({ r1, r2, expected }) => {
  expect(rectIntersecting(r1, r2)).toBe(expected);
  expect(rectIntersecting(r2, r1)).toBe(expected);
});

test.each`
  p1                  | p2                 | expected
  ${{ x: 0, y: 0 }}   | ${{ x: 0, y: 0 }}  | ${0}
  ${{ x: 10, y: 0 }}  | ${{ x: 0, y: 0 }}  | ${10}
  ${{ x: -10, y: 0 }} | ${{ x: 0, y: 0 }}  | ${10}
  ${{ x: 10, y: 0 }}  | ${{ x: 5, y: 0 }}  | ${5}
  ${{ x: -10, y: 0 }} | ${{ x: -5, y: 0 }} | ${5}
  ${{ x: 0, y: 0 }}   | ${{ x: 0, y: 0 }}  | ${0}
  ${{ x: 0, y: 10 }}  | ${{ x: 0, y: 0 }}  | ${10}
  ${{ x: 0, y: 10 }}  | ${{ x: 10, y: 0 }} | ${14.142135623730951}
  ${{ x: 0, y: 10 }}  | ${{ x: 0, y: 5 }}  | ${5}
`('distance($p1, $p2) -> $expected', ({ p1, p2, expected }) => {
  expect(distance(p1, p2)).toBe(expected);
});

test.each`
  l1                                                 | l2                                                    | expected
  ${{ from: { x: 0, y: 0 }, to: { x: 10, y: 0 } }}   | ${{ from: { x: 0, y: 10 }, to: { x: 10, y: 10 } }}    | ${false}
  ${{ from: { x: 0, y: 0 }, to: { x: 10, y: 10 } }}  | ${{ from: { x: 0, y: 10 }, to: { x: 10, y: 0 } }}     | ${true}
  ${{ from: { x: 0, y: 0 }, to: { x: 10, y: 10 } }}  | ${{ from: { x: 0, y: 1000 }, to: { x: 10, y: 0 } }}   | ${true}
  ${{ from: { x: 0, y: 0 }, to: { x: 100, y: 10 } }} | ${{ from: { x: 0, y: 100 }, to: { x: 10, y: 0 } }}    | ${true}
  ${{ from: { x: 0, y: 0 }, to: { x: 100, y: 10 } }} | ${{ from: { x: 100, y: 100 }, to: { x: 90, y: 0 } }}  | ${true}
  ${{ from: { x: 0, y: 0 }, to: { x: 100, y: 10 } }} | ${{ from: { x: 100, y: 100 }, to: { x: 110, y: 0 } }} | ${false}
  ${{ from: { x: 0, y: 0 }, to: { x: 100, y: 10 } }} | ${{ from: { x: 100, y: 100 }, to: { x: 90, y: 11 } }} | ${false}
`('lineIntersecting($l1, $l2) -> $expected', ({ l1, l2, expected }) => {
  expect(lineIntersecting(l1, l2)).toBe(expected);
});

test.each`
  line                                             | circle                         | expected
  ${{ from: { x: 0, y: 0 }, to: { x: 10, y: 0 } }} | ${{ x: 0, y: 10, radius: 5 }}  | ${false}
  ${{ from: { x: 0, y: 0 }, to: { x: 10, y: 0 } }} | ${{ x: 5, y: -10, radius: 5 }} | ${false}
  ${{ from: { x: 0, y: 0 }, to: { x: 10, y: 0 } }} | ${{ x: 5, y: -4, radius: 5 }}  | ${true}
  ${{ from: { x: 0, y: 0 }, to: { x: 10, y: 0 } }} | ${{ x: 20, y: -4, radius: 5 }} | ${false}
`('lineCircleIntersecting($line, $circle) -> $expected', ({ line, circle, expected }) => {
  expect(lineCircleIntersecting(line, circle)).toBe(expected);
});

test.each`
  point               | rect                                     | expected
  ${{ x: 1, y: 1 }}   | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${true}
  ${{ x: -1, y: 1 }}  | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
  ${{ x: 1, y: 11 }}  | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
  ${{ x: 11, y: 11 }} | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
  ${{ x: -1, y: 1 }}  | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
`('pointRectIntersecting($point, $rect) -> $expected', ({ point, rect, expected }) => {
  expect(pointRectIntersecting(point, rect)).toBe(expected);
});

test.each`
  point               | rect                                     | expected
  ${{ x: 1, y: 1 }}   | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${true}
  ${{ x: -1, y: 1 }}  | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
  ${{ x: 1, y: 11 }}  | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
  ${{ x: 11, y: 11 }} | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
  ${{ x: -1, y: 1 }}  | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
`('pointRectIntersecting($point, $rect) -> $expected', ({ point, rect, expected }) => {
  expect(pointRectIntersecting(point, rect)).toBe(expected);
});

test.each`
  circle                         | rect                                     | expected
  ${{ x: 1, y: 1, radius: 5 }}   | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${true}
  ${{ x: -1, y: 1, radius: 5 }}  | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${true}
  ${{ x: -10, y: 1, radius: 5 }} | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
  ${{ x: 1, y: 11, radius: 5 }}  | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${true}
  ${{ x: 11, y: 11, radius: 5 }} | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${true}
  ${{ x: 20, y: 11, radius: 5 }} | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${false}
  ${{ x: -1, y: 1, radius: 5 }}  | ${{ x: 0, y: 0, width: 10, height: 10 }} | ${true}
`('circleRectIntersecting($circle, $rect) -> $expected', ({ circle, rect, expected }) => {
  expect(circleRectIntersecting(circle, rect)).toBe(expected);
});

test.each`
  c1                           | c2                             | expected
  ${{ x: 1, y: 1, radius: 5 }} | ${{ x: 1, y: 1, radius: 5 }}   | ${-10}
  ${{ x: 0, y: 0, radius: 5 }} | ${{ x: 20, y: 0, radius: 5 }}  | ${10}
  ${{ x: 0, y: 0, radius: 5 }} | ${{ x: 20, y: 20, radius: 5 }} | ${18.284271247461902}
  ${{ x: 0, y: 0, radius: 5 }} | ${{ x: 0, y: 20, radius: 5 }}  | ${10}
`('circleDistance($c1, $c2) -> $expected', ({ c1, c2, expected }) => {
  expect(circleDistance(c1, c2)).toBe(expected);
});

test.each`
  value  | current | expected
  ${10}  | ${0}    | ${1}
  ${10}  | ${5}    | ${5.5}
  ${10}  | ${8}    | ${8.2}
  ${10}  | ${9.8}  | ${10}
  ${-10} | ${0}    | ${-1}
  ${-10} | ${-5}   | ${-5.5}
  ${-10} | ${-8}   | ${-8.2}
  ${-10} | ${-9.8} | ${-10}
`('approach($value, $current, 0.1, 0.5) -> $expected', ({ value, current, expected }) => {
  expect(approach(value, current, 0.1, 0.5)).toBe(expected);
});

test.each`
  angle             | quadrants | expected
  ${0}              | ${8}      | ${0}
  ${0.5 * Math.PI}  | ${8}      | ${2}
  ${1 * Math.PI}    | ${8}      | ${4}
  ${1.99 * Math.PI} | ${8}      | ${7}
`('angleToQuadrant($angle, $quadrants) -> $expected', ({ angle, quadrants, expected }) => {
  expect(angleToQuadrant(angle, quadrants)).toBe(expected);
});
