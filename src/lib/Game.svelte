<script lang="ts">
  import { Application, Container, Sprite, Text } from 'pixi.js';
  import { onMount } from 'svelte';
  import { keyboardSetup } from './keyboard';
  import { avoidCollisions, move, slowDownWhenClose } from './engine';
  import { rotateVector, rand, randBetween, rectIntersecting, accelerate, decelerate } from './math';
  import type { Actor } from './engine';

  let canvas: HTMLCanvasElement;

  const { onKeyDown, onKeyUp, pressedKeys } = keyboardSetup({ keys: ['ArrowLeft', 'ArrowRight', 'ArrowUp'] });

  enum OBSTACLE {
    COW,
    TREE,
    CAR,
  }

  function spawn(type: OBSTACLE) {
    const direction = { x: -1, y: 0 };
    const oppositeDirection = { x: 1, y: 0 };
    switch (type) {
      case OBSTACLE.COW:
        return {
          value: new Text('COW', { fill: '#FFFFFF' }),
          direction: rotateVector(direction, rand(Math.PI * 2)),
          center: { x: 20, y: 10 },
          speed: 0,
          sight: 10,
          topSpeed: rand(0.04, 0.2),
          acceleration: 0.01,
          deceleration: 0.1,
        };
      case OBSTACLE.TREE:
        return {
          value: new Text('TR', { fill: '#FFFFFF' }),
          direction,
          center: { x: 10, y: 10 },
          speed: 0,
          sight: 0,
          topSpeed: 0,
          acceleration: 0,
          deceleration: 0,
        };
      case OBSTACLE.CAR:
        return {
          value: new Text('CAR', { fill: '#FFFFFF' }),
          direction: rotateVector(randBetween([direction, oppositeDirection]), rand(0.2)),
          center: { x: 20, y: 10 },
          speed: 1,
          sight: 50,
          topSpeed: rand(1, 4),
          acceleration: 0.2,
          deceleration: 1,
        };
    }
  }

  onMount(() => {
    const app = new Application({ width: 400, height: 225, view: canvas });

    const player: Actor<Sprite> = {
      value: Sprite.from('/vite.svg'),
      direction: { x: 1, y: 0 },
      topSpeed: 2,
      center: { x: 16, y: 16 },
      acceleration: 0.1,
      deceleration: 0.2,
      sight: 10,
      speed: 0,
    };

    const obstacles: Set<Actor<Container>> = new Set();
    const actors: Set<Actor<Container>> = new Set([player]);

    player.value.x = 0;
    player.value.y = app.view.height / 2;
    player.value.pivot.set(16, 16);
    app.stage.addChild(player.value);

    app.ticker.add(() => {
      if (obstacles.size < 5) {
        const obstacle = spawn(randBetween([OBSTACLE.CAR]));
        obstacle.value.x = -app.stage.x + app.view.width - 50;
        obstacle.value.y = rand(10, app.view.height - 10);
        obstacles.add(obstacle);
        actors.add(obstacle);
        app.stage.addChild(obstacle.value);
      }

      avoidCollisions(obstacles);
      slowDownWhenClose(obstacles, actors);
      move(actors);

      for (const obstacle of obstacles) {
        if (
          !rectIntersecting(obstacle.value, {
            x: -app.stage.x,
            y: app.stage.y,
            width: app.view.width,
            height: app.view.height,
          })
        ) {
          obstacles.delete(obstacle);
          actors.delete(obstacle);
          app.stage.removeChild(obstacle.value);
        }
      }

      player.value.rotation = Math.atan2(player.direction.y, player.direction.x) - Math.PI / 2;
      const scrolledX = -player.value.x + 100;
      const distance = scrolledX - app.stage.x;
      app.stage.x = Math.abs(distance) < 0.4 ? scrolledX : app.stage.x + distance / 10;

      const input = pressedKeys();
      if (input.ArrowUp) {
        player.speed = accelerate(player);
      } else {
        player.speed = decelerate(player);
      }

      if (input.ArrowRight) {
        player.direction = rotateVector(player.direction, player.speed > 0 ? 0.03 : 0);
      }
      if (input.ArrowLeft) {
        player.direction = rotateVector(player.direction, player.speed > 0 ? -0.03 : 0);
      }
    });
  });
</script>

<svelte:window on:keyup={onKeyUp} on:keydown={onKeyDown} />

<div class="h-full w-full" role="presentation">
  <canvas class="h-full w-full" bind:this={canvas}></canvas>
</div>
