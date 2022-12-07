export const unpackArray = <T, K extends keyof T>(params: T, key: K): T[K] => {
  return params[`${String(key)}[]`].split(',');
};
