

export const distinct = <T = { id: string | number }>(
  arr: T[],
  distinctKey: keyof T,
): T[] => {
  return arr.filter(item =>
    arr.findIndex(ele => ele[distinctKey] === item[distinctKey]),
  );
};
