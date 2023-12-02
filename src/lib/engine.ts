import {
  rotateVector,
  rand,
  type Pos,
  type Circle,
  type Rect,
  circleRectIntersecting,
  circleDistance,
  approach,
} from './math';

export interface Base<TValue> {
  value: TValue;
}

export interface PhysicalObject extends Circle {}

export interface MovingObject extends PhysicalObject {
  speed: number;
  direction: Pos;
}

export function isMovingObject(item: PhysicalObject): item is MovingObject {
  return 'speed' in item;
}

export interface ActorObject extends MovingObject {
  acceleration: number;
  deceleration: number;
  desiredDirection: Pos;
  sight: number;
  topSpeed: number;
}

export function isActorObject(item: PhysicalObject): item is ActorObject {
  return 'sight' in item;
}

export function toDeceleratedSpeed(motion: ActorObject): number {
  return Math.max(0, motion.speed - motion.deceleration);
}

export function toAcceleratedSpeed(motion: ActorObject): number {
  return Math.min(motion.topSpeed, motion.speed + motion.acceleration);
}

function toMovedObject<T extends MovingObject | PhysicalObject>(obj: T, distance: number): T {
  return isMovingObject(obj)
    ? { ...obj, x: obj.x + obj.direction.x * distance, y: obj.y + obj.direction.y * distance }
    : obj;
}

export function move(objects: MovingObject[]) {
  for (const obj of objects) {
    obj.x = obj.direction.x * obj.speed + obj.x;
    obj.y = obj.direction.y * obj.speed + obj.y;
  }
}

export function objectsOutside<T extends PhysicalObject>(objects: T[], viewport: Rect): [T[], T[]] {
  const outside = [];
  const inside = [];
  for (const obj of objects) {
    if (circleRectIntersecting(obj, viewport)) {
      inside.push(obj);
    } else {
      outside.push(obj);
    }
  }
  return [inside, outside];
}

export function avoidCollisions(actors: ActorObject[], obstacles: (PhysicalObject | MovingObject)[]) {
  for (const actor of actors) {
    const avoid = obstacles.find(
      (obstacle) =>
        actor !== obstacle &&
        circleDistance(toMovedObject(actor, actor.sight), toMovedObject(obstacle, actor.sight / 2)) <
          (actor.sight * actor.speed) / 10,
    );
    if (avoid) {
      const directionAngle = Math.atan2(avoid.x - actor.x, avoid.y - actor.y) - Math.PI / 2;
      actor.direction = rotateVector(actor.direction, directionAngle > 0 ? rand(0.02, 0.03) : rand(-0.02, -0.03));
    } else {
      actor.direction.x = approach(actor.desiredDirection.x, actor.direction.x, 0.05, 0.1);
      actor.direction.y = approach(actor.desiredDirection.y, actor.direction.y, 0.05, 0.1);
    }
    if (
      obstacles.some(
        (obstacle) =>
          actor !== obstacle &&
          circleDistance(
            toMovedObject(actor, (actor.sight * actor.speed) / 10),
            toMovedObject(obstacle, actor.sight / 20),
          ) <
            (actor.sight * actor.speed) / 20,
      )
    ) {
      actor.speed = toDeceleratedSpeed(actor);
    } else {
      actor.speed = toAcceleratedSpeed(actor);
    }
  }
}
