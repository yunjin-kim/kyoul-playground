export const getDropRange = (num: number): Array<number> => {
  const arr = [];
  for (let i = -num; i <= num; i++) {
    arr.push(i);
  }
  return arr;
};

export const isInRange = (num: number): boolean => {
  if (num > 0.8) return true;
  if (num < 0.2) return true;

  return false;
};
