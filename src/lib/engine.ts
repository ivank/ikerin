import * as circle from './circle';
import * as rect from './rect';
import * as vec from './vector';

export interface Base<TValue> {
  value: TValue;
}

export interface PhysicalObject extends circle.Circle {}

export interface MovingObject extends PhysicalObject {
  velocity: vec.Vector;
}

export function isMovingObject(item: PhysicalObject): item is MovingObject {
  return 'velocity' in item;
}

export interface ActorObject extends MovingObject {
  velocityGoal: vec.Vector;
  sight: number;
}

export function isActorObject(item: PhysicalObject): item is ActorObject {
  return 'sight' in item;
}

export function move(objects: MovingObject[]) {
  for (const obj of objects) {
    obj.x = obj.velocity.x + obj.x;
    obj.y = obj.velocity.y + obj.y;
  }
}

export function objectsOutside<T extends PhysicalObject>(objects: T[], viewport: rect.Rect): [T[], T[]] {
  const outside = [];
  const inside = [];
  for (const obj of objects) {
    if (rect.isIntersectingCircle(obj, viewport)) {
      inside.push(obj);
    } else {
      outside.push(obj);
    }
  }
  return [inside, outside];
}

export function timeToCollision(actor: ActorObject, obj: MovingObject | PhysicalObject): number {
  const r = actor.radius + obj.radius;
  const w = vec.sub(obj, actor);
  const c = vec.dot(w, w) - r * r;

  if (c < 0) {
    return 0;
  }
  const v = isMovingObject(obj) ? vec.sub(actor.velocity, obj.velocity) : actor.velocity;
  const a = vec.dot(v, v);
  const b = vec.dot(w, v);
  const discard = b * b - a * c;
  if (discard <= 0) {
    return Infinity;
  }
  const tau = (b - Math.sqrt(discard)) / a;
  return tau < 0 ? Infinity : tau;
}

export function collisionAvoidanceForces(actors: ActorObject[], obstacles: (MovingObject | PhysicalObject)[]) {
  for (const actor of actors) {
    const vg = actor.velocityGoal;
    const v = actor.velocity;
    const goalForce = vec.scale(vec.sub(vg, v), 2);
    let force = goalForce;

    for (const neighbor of obstacles.filter((item) => item !== actor)) {
      const t = timeToCollision(actor, neighbor);

      if (t === 0) {
        force = vec.add(actor.velocity, vec.scale(vec.rotateFlip(actor.velocity), 0.08));
      } else if (t !== Infinity) {
        const timeHorizon = isMovingObject(neighbor) ? actor.sight : actor.sight / 4;
        const neighborV = isMovingObject(neighbor) ? neighbor.velocity : { x: 0, y: 0 };
        let avoidDirection = vec.sub(vec.add(actor, vec.scale(v, t)), neighbor, vec.scale(neighborV, t));

        if (avoidDirection.x !== 0 && avoidDirection.y !== 0) {
          avoidDirection = vec.scale(avoidDirection, 1 / Math.sqrt(vec.dot(avoidDirection, avoidDirection)));
        }
        const magnitude = Math.min(8, t >= 0 && t <= timeHorizon ? (timeHorizon - t) / (t + 0.001) : 0);
        const avoidForce = vec.scale(avoidDirection, magnitude);
        force = vec.add(force, avoidForce);
      }
    }
    actor.velocity = vec.scale(vec.add(actor.velocity, force), 0.1);
  }
}

export function approach(value: number, current: number, nudge: number, cutoff: number): number {
  const distance = value - current;
  return Math.abs(distance) < cutoff ? value : current + distance * nudge;
}
