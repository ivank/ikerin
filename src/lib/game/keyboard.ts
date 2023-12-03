export type Key = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

export const keyboardSetup = <T extends Key[]>({ active = true, keys }: { active?: boolean; keys: T }) => {
  const input = Object.fromEntries(keys.map((key) => [key, false])) as { [K in (typeof keys)[number]]: boolean };

  return {
    onKeyUp(event: KeyboardEvent) {
      if (active) {
        for (const key of keys) {
          if (key === event.key) {
            input[key] = false;
          }
        }
        event.preventDefault();
      }
    },
    onKeyDown(event: KeyboardEvent) {
      if (active) {
        for (const key of keys) {
          if (key === event.key) {
            input[key] = true;
          }
        }
        event.preventDefault();
      }
    },
    pressedKeys() {
      return input;
    },
    toggle(toggle: boolean) {
      active = toggle;
    },
  };
};
