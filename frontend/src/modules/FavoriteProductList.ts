import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs/promises';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SelectedGoods {
  goodsId: number;
  goodsName: string;
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
      const isDuplicate = state.goods.find((goods : {goodsId : number, goodsName: string}) => goods.goodsId == action.payload.goodsId);
      if (isDuplicate) {
        console.log('중복');
      }else{
        state.goods.push({ goodsId: action.payload.goodsId, goodsName: action.payload.goodsName });
      }
    },
    removeGoods: (state, action: PayloadAction<{ goodsId: number }>) => {
      const data = state.goods.filter((goods : {goodsId : number, goodsName: string}) => {
        return goods.goodsId != action.payload.goodsId;
      });
      state.goods = data;
    },
  },
});

export const { addGoods, removeGoods } = favoriteGoodsSlice.actions;
export default favoriteGoodsSlice.reducer;
