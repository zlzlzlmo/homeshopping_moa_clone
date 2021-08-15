import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../configStore";

interface Time {
  start: string;
  end: string;
}
export interface ProductState {
  title: string;
  image: string;
  price: string;
  time: Time;
  is_broadcasting: boolean;
  shopping_company: string;
  shopping_kind: string;
  company_logo: string;
  category: string;
  link: string;
}
const initialState: ProductState[] = [];
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductState[]>) => {
      return action.payload;
    },
  },
});
export const { setProduct } = productSlice.actions;
export const getProducts = (state: RootState) => state.product;
export default productSlice.reducer;
