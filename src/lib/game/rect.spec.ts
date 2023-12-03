import { expect, test } from 'vitest';
import { isIntersecting, isIntersectingCircle } from './rect';

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
`('isIntersecting($r1, $r2) -> $expected', ({ r1, r2, expected }) => {
  expect(isIntersecting(r1, r2)).toBe(expected);
  expect(isIntersecting(r2, r1)).toBe(expected);
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
`('isIntersectingCircle($circle, $rect) -> $expected', ({ circle, rect, expected }) => {
  expect(isIntersectingCircle(circle, rect)).toBe(expected);
});
