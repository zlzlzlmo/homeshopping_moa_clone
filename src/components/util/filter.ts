import { ProductState } from "../../redux/modules/product";

export const filterProducts = (data: ProductState[], filters: string[]) => {
  return data.filter((item: any) => {
    let result = true;
    for (let i = 0; i < filters.length; i++) {
      if (item[filters[i][0]] !== filters[i][1]) result = false;
    }
    return result;
  });
};
