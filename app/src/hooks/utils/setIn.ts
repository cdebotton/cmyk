export function setIn<Shape, K1 extends keyof Shape>(
  obj: Shape,
  path: [K1],
  value: Shape[K1],
): Shape;

export function setIn<Shape, K1 extends keyof Shape, K2 extends keyof Shape[K1]>(
  obj: Shape,
  path: [K1, K2],
  value: Shape[K1][K2],
): Shape;

export function setIn<
  Shape,
  K1 extends keyof Shape,
  K2 extends keyof Shape[K1],
  K3 extends keyof Shape[K1][K2]
>(obj: Shape, path: [K1, K2, K3], value: Shape[K1][K2][K3]): Shape;

export function setIn<
  Shape,
  K1 extends keyof Shape,
  K2 extends keyof Shape[K1],
  K3 extends keyof Shape[K1][K2],
  K4 extends keyof Shape[K1][K2][K3]
>(obj: Shape, path: [K1, K2, K3, K4], value: Shape[K1][K2][K3][K4]): Shape;

export function setIn<
  Shape,
  K1 extends keyof Shape,
  K2 extends keyof Shape[K1],
  K3 extends keyof Shape[K1][K2],
  K4 extends keyof Shape[K1][K2][K3],
  K5 extends keyof Shape[K1][K2][K3][K4]
>(obj: Shape, path: [K1, K2, K3, K4, K5], value: Shape[K1][K2][K3][K4][K5]): Shape;

/**
 * setIn
 * Deeply set values of nested objects and arrays through an array of keys that
 * describe the path to the value
 *
 * @param obj
 * @param path
 * @param value
 */
export function setIn(obj: any, path: any[], value: any): any {
  const result = Array.isArray(obj) ? [...obj] : { ...obj };
  let node = path.shift();

  // If we only have one key that we're setting, simply set that value.
  if (path.length === 0) {
    result[node] = value;
    return result;
  }

  // Let's make a shallow clone of the node we're about to change to
  // maintain immutability.
  result[node] = Array.isArray(result[node]) ? [...result[node]] : { ...result[node] };

  // Store a visitor node so that we can traverse the object.
  let visitor = result[node];

  while (path.length) {
    // Pull out the next part of our object patht hat we want to move into.
    node = path.shift();

    // If we're at the end of the path, again, let's just set the value
    // and return.
    if (path.length === 0) {
      visitor[node] = value;
      break;
    }

    // If there's more to go, let's make an immutable clone as we did before
    // and then move our visitor into that clone.
    visitor[node] = Array.isArray(visitor[node]) ? [...visitor[node]] : { ...visitor[node] };
    visitor = visitor[node];
  }

  return result;
}
