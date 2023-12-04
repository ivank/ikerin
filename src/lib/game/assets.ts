import { AnimatedSprite, Assets, Sprite } from 'pixi.js';
import type { ActorObject, BgObject, PhysicalObject } from './engine';
import * as vec from './vector';
import * as rect from './rect';
import { rand, randBetween } from './rand';

export interface Base<TValue> {
  value: TValue;
  type: TYPE;
}

export enum TYPE {
  COW,
  TREE,
  VEHICLE,
  PLAYER,
  ROAD,
}
export enum DIRECTION {
  LEFT,
  RIGHT,
}

export interface Road extends BgObject, Base<AnimatedSprite> {
  type: TYPE.ROAD;
}
export interface Cow extends PhysicalObject, Base<AnimatedSprite> {
  type: TYPE.COW;
}
export interface Tree extends PhysicalObject, Base<AnimatedSprite> {
  type: TYPE.TREE;
}
export interface Vehicle extends ActorObject, Base<AnimatedSprite> {
  type: TYPE.VEHICLE;
}
export interface Player extends ActorObject, Base<AnimatedSprite> {
  direction: vec.Vector;
  speed: number;
  type: TYPE.PLAYER;
}
export interface RoadTile extends rect.Rect {
  items: (Cow | Tree | Road)[];
}

function toDirection(value: DIRECTION): vec.Vector {
  switch (value) {
    case DIRECTION.LEFT:
      return { x: -1, y: 0 };
    case DIRECTION.RIGHT:
      return { x: 1, y: 0 };
  }
}

export async function loadAssets(opts: { file: string; width: number; height: number }) {
  const sheet = await Assets.load(opts.file);

  function cow({ x = 0, y = 0, radius = 10 } = {}): Cow {
    const value = new AnimatedSprite(sheet.animations.cow);
    value.animationSpeed = 0.1;
    value.play();
    return { type: TYPE.COW, x, y, value, radius };
  }

  function tree({ x = 0, y = 0, radius = 5 } = {}): Tree {
    const value = new AnimatedSprite(sheet.animations.tree);
    value.gotoAndStop(Math.floor(rand(0, 4)));
    return { type: TYPE.TREE, x, y, value, radius };
  }

  function car({ x = 0, y = 0, direction = DIRECTION.LEFT, speed = 1.2 }): Vehicle {
    const value = new AnimatedSprite(sheet.animations.taxi);
    value.scale.set(1.3, 1.3);
    const velocity = vec.scale(toDirection(direction), speed);
    return {
      type: TYPE.VEHICLE,
      x,
      y,
      radius: 5,
      value,
      direction: toDirection(direction),
      velocityGoal: velocity,
      velocity: { ...velocity },
      sight: 700,
    };
  }

  function truck({ x = 0, y = 0, direction = DIRECTION.LEFT, speed = 0.8 }): Vehicle {
    const value = new AnimatedSprite(sheet.animations.truck);
    value.scale.set(1.1, 1.1);
    const velocity = vec.scale(toDirection(direction), speed);
    return {
      type: TYPE.VEHICLE,
      x,
      y,
      radius: 6,
      value,
      direction: toDirection(direction),
      velocityGoal: velocity,
      velocity: { ...velocity },
      sight: 500,
    };
  }

  function player({ x = 0, y = 0, direction = DIRECTION.RIGHT }): Player {
    return {
      type: TYPE.PLAYER,
      value: new AnimatedSprite(sheet.animations.rickshaw),
      x,
      y,
      direction: toDirection(direction),
      velocityGoal: { x: 0, y: 0 },
      speed: 0,
      velocity: { x: 0, y: 0 },
      radius: 6,
      sight: 10,
    };
  }

  function tile({ x = 0, y = 0, width = opts.width * 3, height = opts.height }): RoadTile {
    const items: Array<Tree | Cow | Road> = [
      { x, y, width, height, value: new AnimatedSprite(sheet.animations.road), type: TYPE.ROAD },
      ...[...Array(Math.round(rand(20, 30)))].map((_, index, all) =>
        tree({ x: x + (width / all.length) * index + rand(-width / 30, width / 30), y: rand(y, y + 20) }),
      ),
      ...[...Array(Math.round(rand(20, 30)))].map((_, index, all) =>
        tree({
          x: x + (width / all.length) * index + rand(-width / 30, width / 30),
          y: rand(y + height - 20, y + height),
        }),
      ),
      cow({
        x: rand(x, width + x),
        y: randBetween([rand(y + 50, y + 70), rand(y + height - 70, y + height - 50)]),
      }),
    ];

    return { x, y, width, height, items };
  }

  return { cow, tree, player, car, tile, truck };
}

export function isVehicle(item: Base<AnimatedSprite>): item is Vehicle {
  return item.type === TYPE.VEHICLE;
}

export function isPhysicalAsset(item: Base<AnimatedSprite>): item is Vehicle | Player | Tree | Cow {
  return item.type === TYPE.VEHICLE || item.type === TYPE.PLAYER || item.type === TYPE.TREE || item.type === TYPE.COW;
}

export function isMovingAsset(item: Base<AnimatedSprite>): item is Vehicle | Player {
  return item.type === TYPE.VEHICLE || item.type === TYPE.PLAYER;
}
