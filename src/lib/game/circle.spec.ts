import { expect, test } from 'vitest';
import { distance, angleToQuadrant } from './circle';

test.each`
  c1                           | c2                             | expected
  ${{ x: 1, y: 1, radius: 5 }} | ${{ x: 1, y: 1, radius: 5 }}   | ${-10}
  ${{ x: 0, y: 0, radius: 5 }} | ${{ x: 20, y: 0, radius: 5 }}  | ${10}
  ${{ x: 0, y: 0, radius: 5 }} | ${{ x: 20, y: 20, radius: 5 }} | ${18.284271247461902}
  ${{ x: 0, y: 0, radius: 5 }} | ${{ x: 0, y: 20, radius: 5 }}  | ${10}
`('distance($c1, $c2) -> $expected', ({ c1, c2, expected }) => {
  expect(distance(c1, c2)).toBe(expected);
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
