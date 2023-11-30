import { lineIntersecting, rotateVector, rand, distance, translatePos, decelerate, accelerate } from './math';

export interface Pos {
  x: number;
  y: number;
}

export interface Line {
  from: Pos;
  to: Pos;
}

export interface Actor<TValue extends Pos> {
  speed: number;
  topSpeed: number;
  acceleration: number;
  deceleration: number;
  center: Pos;
  direction: Pos;
  value: TValue;
  sight: number;
}

function toCollisionLine<TValue extends Pos>({ value, direction, sight }: Actor<TValue>): Line {
  return {
    from: value,
    to: { x: direction.x * sight + value.x, y: direction.y * sight + value.y },
  };
}

export function move<TValue extends Pos>(actors: Iterable<Actor<TValue>>) {
  for (const { value, direction, speed } of actors) {
    value.x = direction.x * speed + value.x;
    value.y = direction.y * speed + value.y;
  }
}

export function slowDownWhenClose<TValue extends Pos>(
  actors: Iterable<Actor<TValue>>,
  obstacles: Iterable<Actor<TValue>>,
) {
  for (const actor of actors) {
    for (const obstacle of obstacles) {
      if (actor !== obstacle) {
        if (distance(translatePos(actor.value, actor.center), translatePos(obstacle.value, obstacle.center)) < 50) {
          actor.speed = decelerate(actor);
        } else {
          actor.speed = accelerate(actor);
        }
      }
    }
  }
}

export function avoidCollisions<TValue extends Pos>(actors: Iterable<Actor<TValue>>) {
  for (const actor of actors) {
    for (const obstacle of actors) {
      if (actor !== obstacle) {
        const actorLine: Line = toCollisionLine(actor);
        const obstacleLine: Line = toCollisionLine(actor);
        if (lineIntersecting(actorLine, obstacleLine)) {
          console.log('INTERSECT!');
          actor.direction = rotateVector(actor.direction, rand(-0.05, 0.05));
        }
      }
    }
  }
}
