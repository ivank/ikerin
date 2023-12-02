import { AnimatedSprite, Assets, Sprite } from 'pixi.js';
import { type Pos, type Rect, rand, randBetween } from './math';
import type { ActorObject, PhysicalObject } from './engine';

export interface Base<TValue> {
  value: TValue;
}

export enum TYPE {
  COW,
  TREE,
  CAR,
  PLAYER,
}
export enum DIRECTION {
  LEFT,
  RIGHT,
}

export interface Cow extends PhysicalObject, Base<Sprite> {
  type: TYPE.COW;
}
export interface Tree extends PhysicalObject, Base<Sprite> {
  type: TYPE.TREE;
}
export interface Car extends ActorObject, Base<Sprite> {
  type: TYPE.CAR;
}
export interface Player extends ActorObject, Base<AnimatedSprite> {
  type: TYPE.PLAYER;
}
export interface RoadTile extends Rect {
  items: (Cow | Tree)[];
}

function toDirection(value: DIRECTION): Pos {
  switch (value) {
    case DIRECTION.LEFT:
      return { x: -1, y: 0 };
    case DIRECTION.RIGHT:
      return { x: 1, y: 0 };
  }
}

export async function loadAssets(opts: { file: string; width: number; height: number }) {
  const sheet = await Assets.load(opts.file);

  function cow({ x = 0, y = 0, radius = 20 } = {}): Cow {
    const value = new AnimatedSprite(sheet.animations.cow);
    value.animationSpeed = 0.1;
    value.play();
    return { type: TYPE.COW, x, y, value, radius };
  }

  function tree({ x = 0, y = 0, radius = 20 } = {}): Tree {
    const value = new AnimatedSprite(sheet.animations.tree);
    value.gotoAndStop(Math.floor(rand(0, 4)));
    return { type: TYPE.TREE, x, y, value, radius };
  }

  function car({ x = 0, y = 0, direction = DIRECTION.LEFT, topSpeed = 1 }): Car {
    const value = new AnimatedSprite(sheet.animations.truck);
    return {
      type: TYPE.CAR,
      x,
      y,
      radius: 8,
      value,
      desiredDirection: toDirection(direction),
      direction: toDirection(direction),
      speed: topSpeed,
      sight: 40,
      topSpeed,
      acceleration: 0.1,
      deceleration: 0.3,
    };
  }

  function player({ x = 0, y = 0, direction = DIRECTION.RIGHT }): Player {
    return {
      type: TYPE.PLAYER,
      value: new AnimatedSprite(sheet.animations.car),
      x,
      y,
      desiredDirection: toDirection(direction),
      direction: toDirection(direction),
      topSpeed: 2,
      radius: 16,
      acceleration: 0.1,
      deceleration: 0.2,
      sight: 10,
      speed: 0,
    };
  }

  function tile({ x = 0, y = 0, width = opts.width * 3, height = opts.height }): RoadTile {
    const items = [
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
        y: randBetween([rand(y, y + 50), rand(y + height - 50, y + height)]),
      }),
    ];
    return { x, y, width, height, items };
  }

  return { cow, tree, player, car, tile };
}