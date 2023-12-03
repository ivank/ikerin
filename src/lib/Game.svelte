<script lang="ts">
  import { AnimatedSprite, Application } from 'pixi.js';
  import { onMount } from 'svelte';
  import { keyboardSetup } from './keyboard';
  import { move, objectsOutside, collisionAvoidanceForces, isMovingObject, approach } from './engine';
  import { loadAssets, type Car, type RoadTile, type Cow, type Player, type Tree, TYPE, DIRECTION } from './assets';
  import * as rect from './rect';
  import * as vec from './vector';
  import * as circle from './circle';
  import { rand, randBetween } from './rand';

  let canvas: HTMLCanvasElement;

  const { onKeyDown, onKeyUp, pressedKeys } = keyboardSetup({ keys: ['ArrowLeft', 'ArrowRight', 'ArrowUp'] });

  const SCREEN_WIDTH = 400;
  const SCREEN_HEIGHT = 225;

  onMount(async () => {
    const app = new Application({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, view: canvas });

    const assets = await loadAssets({ file: '/game/texture.json', width: SCREEN_WIDTH, height: SCREEN_HEIGHT });
    const player = assets.player({ x: 100, y: SCREEN_HEIGHT / 2 });
    const viewport = { x: 0, y: 0, width: app.view.width, height: app.view.height };

    let currentTile = assets.tile({ x: -viewport.width });
    let nextTile: RoadTile;
    let items: Array<Car | Cow | Player | Tree> = [player, ...currentTile.items];

    app.stage.addChild(...items.map((item) => item.value));

    app.ticker.add(() => {
      if (!nextTile && viewport.x + viewport.width + 100 > currentTile.x + currentTile.width) {
        nextTile = assets.tile({ x: currentTile.x + currentTile.width });
        items = items.concat(nextTile.items);
        app.stage.addChild(...nextTile.items.map((item) => item.value));
      }
      if (!rect.isIntersecting(currentTile, viewport)) {
        currentTile = nextTile;
        nextTile = undefined;
      }

      const cars = items.filter((item) => item.type === TYPE.CAR) as Car[];

      if (cars.length < 6) {
        const car = randBetween([
          assets.car({
            direction: DIRECTION.LEFT,
            x: viewport.x + viewport.width * rand(1, 2),
            y: rand(112, 190),
            speed: rand(10, 15),
          }),
          assets.car({
            direction: DIRECTION.RIGHT,
            x: viewport.x - viewport.width * rand(0, 1),
            y: rand(20, 90),
            speed: rand(10, 15),
          }),
        ]);

        app.stage.addChild(car.value);
        items.push(car);
      }

      const moving = items.filter((item) => item.type == TYPE.PLAYER || item.type === TYPE.CAR) as (Player | Car)[];
      collisionAvoidanceForces(cars, items);

      const [inside, outside] = objectsOutside(items, rect.extrude(viewport, viewport.width * 3, viewport.height));
      items = inside;

      app.stage.removeChild(...outside.map((item) => item.value));

      viewport.x = approach(player.x - 100, viewport.x, 0.05, 0.4);
      viewport.y = approach(player.y - 112, viewport.y, 0.05, 0.4);

      const input = pressedKeys();

      if (player.speed > 0) {
        if (input.ArrowRight) {
          player.direction = vec.rotate(player.direction, 0.03);
        }
        if (input.ArrowLeft) {
          player.direction = vec.rotate(player.direction, -0.03);
        }
      }

      player.speed = input.ArrowUp ? Math.min(2, player.speed + 0.1) : Math.max(0, player.speed - 0.2);
      player.velocity = vec.scale(player.direction, player.speed);

      move(moving);

      for (const item of items) {
        if (isMovingObject(item) && item.value instanceof AnimatedSprite) {
          const angle = -Math.atan2(item.velocity.y, item.velocity.x) + 0.125 * Math.PI;
          const positiveAngle = (angle + 2 * Math.PI) % (2 * Math.PI);
          item.value.gotoAndStop(circle.angleToQuadrant(positiveAngle, 8));
        }
        item.value.x = -viewport.x + item.x - item.value.width / 2;
        item.value.y = -viewport.y + item.y - item.value.height / 2;
      }
    });
  });
</script>

<svelte:window on:keyup={onKeyUp} on:keydown={onKeyDown} />

<div class="h-full w-full" role="presentation">
  <canvas class="h-full w-full" bind:this={canvas}></canvas>
</div>
