export const filterProducts = (data: any[], filters: any[]) => {
  return data.filter((item) => {
    let result = true;
    for (let i = 0; i < filters.length; i++) {
      if (item[filters[i][0]] !== filters[i][1]) result = false;
    }
    return result;
  });
};
