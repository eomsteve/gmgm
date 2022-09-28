import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs/promises';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BasicProduct {
  id:number;
  basicProductId: number;
  basicProductName: string;
  status: boolean;
}

export interface CustomProduct {
  id: number;
  customProductName: string;
  status: boolean;
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
        state.checklistBasicItems.push({id:-1, basicProductId: action.payload.basicProductId, basicProductName: action.payload.basicProductName, status: false });
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
    updateBasicProducts : (state, action: PayloadAction<BasicProduct>) => {
      const data = state.checklistBasicItems.find((products) => { 
        return products.basicProductName == action.payload.basicProductName;
      });
      if (typeof(data) !== "undefined") {
        data.status = !data?.status;
      }else{
        console.error("없다는게말이됨?")
      }
    },
    addCustomProducts: (state, action : PayloadAction<CustomProduct>)=>{
      const isDuplicate = state.checklistCustomItems.find((products) => products.customProductName == action.payload.customProductName);
      if (isDuplicate) {
        console.log('중복');
      }else{
        state.checklistCustomItems.push({ id: action.payload.id, customProductName: action.payload.customProductName, status: action.payload.status });
      }
    },
    removeCustomProducts: (state, action : PayloadAction<CustomProduct>)=>{
      const data = state.checklistCustomItems.filter((products) => {
        return products.customProductName != action.payload.customProductName;
      });
      state.checklistCustomItems = data;
    },
    updateCustomProductStatus: (state, action : PayloadAction<CustomProduct>)=>{
      const data = state.checklistCustomItems.find((products) => { 
        return products.customProductName == action.payload.customProductName;
      });
      if (typeof(data) !== "undefined") {
        data.status = !data?.status;
      }else{
        console.error("없다는게말이됨?")
      }
    }
  },
});

export const { addBasicProducts, removeBasicProducts, addCustomProducts, removeCustomProducts } = checkListProductsSlice.actions;
export default checkListProductsSlice.reducer;
