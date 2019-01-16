export type DeepObjectMap<Shape, Type> = {
  [P in keyof Shape]: Shape[P] extends Array<infer U>
    ? DeepObjectMap<U, Type>
    : Shape[P] extends object
    ? DeepObjectMap<Shape[P], Type>
    : Type
};

export function transformDeepValues<
  Shape,
  TTransformer extends <Key extends keyof Shape>(value: Shape[Key]) => unknown
>(obj: Shape, transformer: TTransformer): DeepObjectMap<Shape, ReturnType<TTransformer>> {
  return Object.entries(obj).reduce<any>((memo, [key, value]) => {
    const nextValue =
      typeof value === 'object' ? transformDeepValues(value, transformer) : transformer(value);

    return {
      ...memo,
      [key]: nextValue,
    };
  }, {});
}
