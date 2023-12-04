<script lang="ts">
  import { AnimatedSprite, Application } from 'pixi.js';
  import { onMount } from 'svelte';
  import { keyboardSetup } from './game/keyboard';
  import { move, objectsOutside, collisionAvoidanceForces, approach, isPhysicalObject } from './game/engine';
  import {
    type RoadTile,
    type Cow,
    type Player,
    type Tree,
    type Road,
    type Vehicle,
    loadAssets,
    DIRECTION,
    isVehicle,
    isMovingAsset,
    isPhysicalAsset,
    alignAnimationsToDirection,
    renderAssetMovement,
    reorderZIndex,
  } from './game/assets';
  import * as rect from './game/rect';
  import * as vec from './game/vector';
  import * as circle from './game/circle';
  import { rand, randBetween } from './game/rand';

  let canvas: HTMLCanvasElement;
  let app: Application;

  const { onKeyDown, onKeyUp, pressedKeys, toggle } = keyboardSetup({
    keys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
  });

  const onResize = (event: UIEvent & { currentTarget: Window }) => {
    if (event.currentTarget.innerWidth < 1280) {
      app?.stop();
      toggle(false);
    } else {
      app?.start();
      toggle(true);
    }
  };

  const SCREEN_WIDTH = 400;
  const SCREEN_HEIGHT = 225;

  onMount(async () => {
    app = new Application({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, view: canvas });

    const assets = await loadAssets({ file: '/game/texture.json', width: SCREEN_WIDTH, height: SCREEN_HEIGHT });
    const player = assets.player({ x: 100, y: SCREEN_HEIGHT / 2 });
    const viewport = { x: 0, y: 0, width: app.view.width, height: app.view.height };

    let currentTile = assets.tile({ x: -viewport.width });
    let nextTile: RoadTile;
    let items: Array<Vehicle | Cow | Player | Tree | Road> = [...currentTile.items, player];

    app.stage.addChild(...items.map((item) => item.value));

    app.ticker.add(() => {
      const vehicles = items.filter(isVehicle);

      if (!nextTile && viewport.x + viewport.width + 100 > currentTile.x + currentTile.width) {
        nextTile = assets.tile({ x: currentTile.x + currentTile.width });
        items = items.concat(nextTile.items);
        app.stage.addChild(...nextTile.items.map((item) => item.value));
        app.stage.addChild(...vehicles.map((item) => item.value), player.value);
      }
      if (!rect.isIntersecting(currentTile, viewport)) {
        currentTile = nextTile;
        nextTile = undefined;
      }

      if (vehicles.length < 10) {
        const vehicle = randBetween([
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
          assets.truck({
            direction: DIRECTION.LEFT,
            x: viewport.x + viewport.width * rand(1, 2),
            y: rand(112, 190),
            speed: rand(8, 10),
          }),
          assets.truck({
            direction: DIRECTION.RIGHT,
            x: viewport.x - viewport.width * rand(0, 1),
            y: rand(20, 90),
            speed: rand(8, 10),
          }),
        ]);
        if (!items.filter(isPhysicalAsset).some((item) => circle.distance(item, vehicle) < 30)) {
          app.stage.addChild(vehicle.value);
          items.push(vehicle);
        }
      }

      const [inside, outside] = objectsOutside(items, rect.extrude(viewport, viewport.width * 3, viewport.height));
      items = inside;

      app.stage.removeChild(...outside.map((item) => item.value));

      viewport.x = approach(player.x - 100, viewport.x, 0.05, 0.4);
      const input = pressedKeys();

      if (player.speed !== 0) {
        if (input.ArrowRight) {
          player.direction = vec.rotate(player.direction, 0.03);
        }
        if (input.ArrowLeft) {
          player.direction = vec.rotate(player.direction, -0.03);
        }
      }

      player.speed = input.ArrowUp
        ? Math.min(2, player.speed + 0.1)
        : input.ArrowDown
          ? Math.max(-0.5, player.speed - 0.1)
          : Math.max(0, player.speed - 0.2);

      player.velocity = vec.scale(player.direction, player.speed);

      for (const other of items) {
        if (player.speed > 0 && other != player && isPhysicalObject(other) && circle.distance(player, other) < 0) {
          player.velocity = { x: 0, y: 0 };
        }
      }

      collisionAvoidanceForces(vehicles, items);
      move(items.filter(isMovingAsset));
      reorderZIndex(app.stage, items.filter(isPhysicalAsset));
      alignAnimationsToDirection(items.filter(isMovingAsset));
      renderAssetMovement(viewport, items);
    });
  });
</script>

<svelte:window on:keyup={onKeyUp} on:keydown={onKeyDown} on:resize={onResize} />

<div class="h-full w-full" role="presentation">
  <canvas class="h-full w-full" bind:this={canvas}></canvas>
</div>
