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

export const deleteHypenFromDate = (date: string) => {
  return date.replaceAll("-", "");
};

export const setQueryStringParameter = (name: string, value: string) => {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.replaceState(
    {},
    "",
    decodeURIComponent(`${window.location.pathname}?${params}`)
  );
};
