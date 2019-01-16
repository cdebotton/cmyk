// Maintain the keys but transform the values of an object.

export function transformValues<
  Shape extends object,
  TTransformer extends <Key extends keyof Shape>(value: Shape[Key]) => unknown
>(obj: Shape, transformer: TTransformer): { [P in keyof Shape]: ReturnType<TTransformer> } {
  // Casting to any. Since typescript won't allow for properly typing a partial,
  // implementation, we're going to bury our secrets in this one method by
  // using an `any` type in this reduce method here and then forcing the type to
  // what we want in the functions return type.
  return Object.entries(obj).reduce<any>((memo, [key, value]) => {
    return {
      ...memo,
      [key]: transformer(value),
    };
  }, {});
}
