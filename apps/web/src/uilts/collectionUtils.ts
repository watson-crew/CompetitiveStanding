export function toObj<V, K extends keyof V>(
  arr: V[],
  keyField: K,
): Record<K, V> {
  return Object.fromEntries(arr.map(item => [item[keyField], item]));
}

export function withIndexReplaced<T>(arr: T[], newValue: T, index: number) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export function defaultIfEmpty<T>(arr: T[], defaultVal: T): T[] {
  return arr.length === 0 ? [defaultVal] : arr;
}

export function filterFalsey<T, K extends keyof T>(
  arr: T[],
  filterField: K,
): T[] {
  return arr.filter(item => !!item[filterField]);
}
