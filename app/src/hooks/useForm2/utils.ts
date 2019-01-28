import cloneDeep from 'lodash.clonedeep';
import toPath from 'lodash.topath';

export type Mapped<Values, Target> = {
  [Key in keyof Values]: Values[Key] extends object ? Mapped<Values[Key], Target> : Target
};

function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object';
}

export function setNested<T, U>(
  object: T,
  value: U,
  visited = new WeakMap(),
  response: any = {},
): Mapped<T, U> {
  for (let key of Object.keys(object)) {
    const v = object[key];
    if (isObject(v)) {
      if (!visited.get(v)) {
        visited.set(v, true);
        response[key] = Array.isArray(v) ? [] : {};
        setNested(v, value, visited, response[key]);
      }
    } else {
      response[key] = value;
    }
  }

  return response;
}

const isInteger = (n: any) => {
  return Math.floor(parseInt(n, 10)) === n;
};

export function getIn<T>(source: T, key: string | string[], def?: any, p = 0): any {
  const path = toPath(key);
  while (source && p < path.length) {
    source = source[path[p++]];
  }
  return source === undefined ? def : source;
}

export function setIn<T, U>(source: T, path: string | string[], value: U): T {
  let res: any = {};
  let resVal: any = res;
  let i = 0;
  const pathArray = toPath(path);

  for (; i < pathArray.length - 1; i++) {
    const currentPath = pathArray[i];
    let currentObj = getIn(source, pathArray.slice(0, i + 1));

    if (resVal[currentPath]) {
      resVal = resVal[currentPath];
    } else if (currentObj) {
      resVal = resVal[currentPath] = cloneDeep(currentObj);
    } else {
      const nextPath = pathArray[i + 1];
      resVal = resVal[currentPath] = isInteger(nextPath) && Number(nextPath) >= 0 ? [] : [];
    }
  }

  if ((i === 0 ? source : resVal)[pathArray[i]] === value) {
    return source;
  }

  if (value === undefined) {
    delete resVal[pathArray[i]];
  } else {
    resVal[pathArray[i]] = value;
  }

  const result = { ...source, ...res };

  if (i === 0 && value === undefined) {
    delete result[pathArray[i]];
  }

  return result;
}

export function arrayRemoveIn<T>(source: T, key: string | string[]) {
  const path = toPath(key);
  const index = parseInt(path.pop()!, 10);
  const value: any[] = getIn(source, path);

  if (!isInteger(index)) {
    throw new TypeError('Invalid path provided to remove from array');
  }

  const newValue = value.filter((_, i) => i !== index);

  return setIn(source, path, newValue);
}

export function arrayAddIn(source: any, key: string | string[], value: any, force?: any) {
  const path = toPath(key);
  const target = getIn(source, path);

  if (force !== undefined) {
    value = typeof value === 'object' ? setNested(value, force) : force;
  }

  const newValue = [...target, value];

  return setIn(source, path, newValue);
}
