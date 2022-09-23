import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs/promises';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SelectedProducts {
  productsId: number;
  productsName: string;
};

interface Initial{
  products : SelectedProducts[];
}

const initialState: Initial = {
  products : [],

};

export const checkListProductsSlice = createSlice({
  name: 'checklistProducts',
  initialState,
  reducers: {
    addProducts: (
      state,
      action: PayloadAction<SelectedProducts>,
    ) => {
      state.products.push( {productsId: action.payload.productsId, productsName: action.payload.productsName} );
    },
    removeProducts: (state, action: PayloadAction<{ productsId: number }>) => {
      console.log(action.payload.productsId)
    },
  },
});

export const { addProducts, removeProducts } = checkListProductsSlice.actions;
export default checkListProductsSlice.reducer;
