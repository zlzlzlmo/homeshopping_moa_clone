export const todayToString = (date: number) => {
  const todayString = date.toString();
  const toString =
    todayString.slice(0, 4) +
    "-" +
    todayString.slice(4, 6) +
    "-" +
    todayString.slice(6, 8);
  return toString;
};
