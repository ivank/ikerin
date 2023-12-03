import { expect, test } from 'vitest';
import { distance, dot } from './vector';

test.each`
  v1                  | v2                 | expected
  ${{ x: 0, y: 0 }}   | ${{ x: 0, y: 0 }}  | ${0}
  ${{ x: 10, y: 0 }}  | ${{ x: 0, y: 0 }}  | ${10}
  ${{ x: -10, y: 0 }} | ${{ x: 0, y: 0 }}  | ${10}
  ${{ x: 10, y: 0 }}  | ${{ x: 5, y: 0 }}  | ${5}
  ${{ x: -10, y: 0 }} | ${{ x: -5, y: 0 }} | ${5}
  ${{ x: 0, y: 0 }}   | ${{ x: 0, y: 0 }}  | ${0}
  ${{ x: 0, y: 10 }}  | ${{ x: 0, y: 0 }}  | ${10}
  ${{ x: 0, y: 10 }}  | ${{ x: 10, y: 0 }} | ${14.142135623730951}
  ${{ x: 0, y: 10 }}  | ${{ x: 0, y: 5 }}  | ${5}
`('distance($v1, $v2) -> $expected', ({ v1, v2, expected }) => {
  expect(distance(v1, v2)).toBe(expected);
});

test.each`
  a                  | b                  | expected
  ${{ x: 1, y: 1 }}  | ${{ x: 1, y: 1 }}  | ${2}
  ${{ x: 0, y: 1 }}  | ${{ x: 0, y: 1 }}  | ${1}
  ${{ x: -1, y: 0 }} | ${{ x: -1, y: 0 }} | ${1}
  ${{ x: 5, y: 5 }}  | ${{ x: 5, y: 5 }}  | ${50}
`('dot($a, $b) -> $expected', ({ a, b, expected }) => {
  expect(dot(a, b)).toBe(expected);
});
