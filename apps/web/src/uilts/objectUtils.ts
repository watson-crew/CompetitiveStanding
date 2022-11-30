export function toObj<V, K extends keyof V>(
  arr: V[],
  keyField: K,
): Record<K, V> {
  return Object.fromEntries(arr.map(item => [item[keyField], item]));
}
