export const unpackArray = <T, K extends keyof T>(params: T, key: K): T[K] => {
  const arrParams = params[`${String(key)}[]`] || params[String(key)];
  return arrParams.split(',');
};
