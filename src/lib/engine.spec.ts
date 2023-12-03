import { expect, test } from 'vitest';
import { timeToCollision, approach } from './engine';

test.each`
  actor                                                  | obstacle                                                  | expected
  ${{ x: 0, y: 0, radius: 1, velocity: { x: 1, y: 0 } }} | ${{ x: 0, y: 0, radius: 1, velocity: { x: 0, y: 1 } }}    | ${0}
  ${{ x: 0, y: 0, radius: 1, velocity: { x: 1, y: 0 } }} | ${{ x: 100, y: 3, radius: 1, velocity: { x: -1, y: 0 } }} | ${Infinity}
  ${{ x: 0, y: 0, radius: 1, velocity: { x: 1, y: 0 } }} | ${{ x: 100, y: 0, radius: 1, velocity: { x: -1, y: 0 } }} | ${49}
  ${{ x: 0, y: 0, radius: 2, velocity: { x: 1, y: 0 } }} | ${{ x: 100, y: 3, radius: 2, velocity: { x: -1, y: 0 } }} | ${48.67712434446771}
`('timeToCollision($actor, $obstacle) -> $expected', ({ actor, obstacle, expected }) => {
  expect(timeToCollision(actor, obstacle)).toBe(expected);
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
