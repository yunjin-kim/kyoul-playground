export const getDropRange = (num: number): Array<number> => {
  const arr = [];
  for (let i = -num; i <= num; i++) {
    arr.push(i);
  }
  return arr;
};
