export const distinct = <T = { id: string | number }>(
  arr: T[],
  distinctKey: keyof T,
): T[] => {
  return arr.filter(
    (item, pos) =>
      arr.findIndex(ele => ele[distinctKey] === item[distinctKey]) === pos,
  );
};
