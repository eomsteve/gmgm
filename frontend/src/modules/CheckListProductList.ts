import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs/promises';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BasicProduct {
  basicProductId: number;
  basicProductName: string;
  status?: boolean;
}

export interface CustomProduct {
  id?: number;
  customProductName: string;
  status?: boolean;
}

interface Initial {
  checklistBasicItems: BasicProduct[];
  checklistCustomItems: CustomProduct[];
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
      const isDuplicate = state.checklistBasicItems.find((products) => products.basicProductId == action.payload.basicProductId);
      if (isDuplicate) {
        console.log('중복');
      }else{
        state.checklistBasicItems.push({ basicProductId: action.payload.basicProductId, basicProductName: action.payload.basicProductName, status: action.payload.status });
      }
    },
    removeBasicProducts: (
      state,
      action: PayloadAction<BasicProduct>,
    ) => {
      const data = state.checklistBasicItems.filter((products) => {
        return products.basicProductId != action.payload.basicProductId;
      });
      state.checklistBasicItems = data;
    },
    addCustomProducts: (state, action : PayloadAction<CustomProduct>)=>{
      const isDuplicate = state.checklistCustomItems.find((products) => products.id == action.payload.id);
      if (isDuplicate) {
        console.log('중복');
      }else{
        state.checklistCustomItems.push({ id: action.payload.id, customProductName: action.payload.customProductName, status: action.payload.status });
      }
    },
    removeCustomProducts: (state, action : PayloadAction<CustomProduct>)=>{
      const data = state.checklistCustomItems.filter((products) => {
        return products.id != action.payload.id;
      });
      state.checklistCustomItems = data;
    }
  },
});

export const { addBasicProducts, removeBasicProducts, addCustomProducts, removeCustomProducts } = checkListProductsSlice.actions;
export default checkListProductsSlice.reducer;
