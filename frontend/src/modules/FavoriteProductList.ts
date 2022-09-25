import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs/promises';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SelectedGoods {
  id: number;
  name: string;
}

interface Initial {
  goods: SelectedGoods[];
}

const initialState: Initial = {
  goods: [],
};

export const favoriteGoodsSlice = createSlice({
  name: 'favoriteGoods',
  initialState,
  reducers: {
    addGoods: (state, action: PayloadAction<SelectedGoods>) => {
      const isDuplicate = state.goods.find((goods : {id : number, name: string}) => goods.id == action.payload.id);
      if (isDuplicate) {
        console.log('중복');
      }else{
        state.goods.push({ id: action.payload.id, name: action.payload.name });
      }
    },
    removeGoods: (state, action: PayloadAction<{ id: number }>) => {
      const data = state.goods.filter((goods : {id : number, name: string}) => {
        return goods.id != action.payload.id;
      });
      state.goods = data;
    },
  },
});

export const { addGoods, removeGoods } = favoriteGoodsSlice.actions;
export default favoriteGoodsSlice.reducer;
