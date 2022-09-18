import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs/promises';
import type { PayloadAction } from '@reduxjs/toolkit';

type SelectedGood = {
  id : number;
  name : string;
};
type Goods = SelectedGood[];

const initialState: Goods = [
  
];

export const favoriteGoodsSlice = createSlice({
  name: 'favoriteGoods',
  initialState,
  reducers: {
    addGood: (
      state,
      action: PayloadAction<{
        id : number;
        name : string;
      }>,
    ) => {
      state.push({ id: action.payload.id, name: action.payload.name });
    },
    removeGood: (state, action: PayloadAction<{ id: number }>) => {},
  },
});
