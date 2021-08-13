import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../configStore";

const initialState: any[] = [];
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      return action.payload;
    },
  },
});
export const { setProduct } = productSlice.actions;
export const getProducts = (state: RootState) => state.product;
export default productSlice.reducer;
