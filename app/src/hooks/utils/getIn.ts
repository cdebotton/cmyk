export function getIn<Shape, K1 extends keyof Shape>(obj: Shape, path: [K1]): Shape[K1];

export function getIn<Shape, K1 extends keyof Shape, K2 extends keyof Shape[K1]>(
  obj: Shape,
  path: [K1, K2],
): Shape[K1][K2];

export function getIn<
  Shape,
  K1 extends keyof Shape,
  K2 extends keyof Shape[K1],
  K3 extends keyof Shape[K1][K2]
>(obj: Shape, path: [K1, K2, K3]): Shape[K1][K2][K3];

export function getIn<
  Shape,
  K1 extends keyof Shape,
  K2 extends keyof Shape[K1],
  K3 extends keyof Shape[K1][K2],
  K4 extends keyof Shape[K1][K2][K3]
>(obj: Shape, path: [K1, K2, K3, K4]): Shape[K1][K2][K3][K4];

export function getIn<
  Shape,
  K1 extends keyof Shape,
  K2 extends keyof Shape[K1],
  K3 extends keyof Shape[K1][K2],
  K4 extends keyof Shape[K1][K2][K3],
  K5 extends keyof Shape[K1][K2][K3][K4]
>(obj: Shape, path: [K1, K2, K3, K4, K5]): Shape[K1][K2][K3][K4][K5];

export function getIn(obj: any, path: any[]): any {
  let result: any = obj;
  while (path.length) {
    const prop = path.shift();

    if (!result[prop]) {
      throw new Error(`Property ${prop} does not exist on ${JSON.stringify(result)}`);
    }

    result = result[prop];
  }
  return result;
}
