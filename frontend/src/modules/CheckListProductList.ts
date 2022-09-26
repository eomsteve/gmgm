import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs/promises';
import type { PayloadAction } from '@reduxjs/toolkit';

interface BasicProduct {
  id?: number;
  basicProductId: number;
  basicProductName?: string;
  status?: boolean;
}

interface CustomItem {
  id?: number;
  customProductName: string;
  status?: boolean;
}

interface Initial {
  checklistBasicItems: BasicProduct[];
  checklistCustomItems: CustomItem[];
}

const initialState: Initial = {
  checklistBasicItems: [],
  checklistCustomItems: [],
};

export const checkListProductsSlice = createSlice({
  name: 'checklistProducts',
  initialState,
  reducers: {
    addBasicProducts: (state, action: PayloadAction<BasicProduct>) => {
      // state.checklistBasicItems.push( {productsId: action.payload.productsId, productsName: action.payload.productsName} );
    },
    removeBasicProducts: (
      state,
      action: PayloadAction<{ productsId: number }>,
    ) => {
      console.log(action.payload.productsId);
    },
  },
});

// export const { addProducts, removeProducts } = checkListProductsSlice.actions;
export default checkListProductsSlice.reducer;
