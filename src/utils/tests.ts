/**
 * Overrides the window.location object with the given location
 * and returns a function to restore it.
 */
export function overrideWindowLocation(location: Partial<Location>): () => void {
  const originalLocation = { ...global.window.location };

  function restoreWindowLocation() {
    Object.defineProperty(global, "window", {
      value: {
        ...global.window,
        location: originalLocation,
      },
      writable: true,
    });
  }

  Object.defineProperty(global, "window", {
    value: {
      ...global.window,
      location: {
        ...global.window.location,
        ...location,
      },
    },
    writable: true,
  });

  return restoreWindowLocation;
}

/**
 * Deletes the window object and returns a function to restore it.
 */
export function deleteWindowObject(): () => void {
  const originalWindow = global.window;

  function restoreWindowObject() {
    Object.defineProperty(global, "window", {
      value: originalWindow,
      writable: true,
    });
  }

  Object.defineProperty(global, "window", {
    value: undefined,
    writable: true,
  });

  return restoreWindowObject;
}
