import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs/promises';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SelectedGoods {
  goodsId: number;
  goodsName: string;
};

interface Initial{
  goods : SelectedGoods[];
}

const initialState: Initial = {
  goods : [],

};

export const favoriteGoodsSlice = createSlice({
  name: 'favoriteGoods',
  initialState,
  reducers: {
    addGoods: (
      state,
      action: PayloadAction<SelectedGoods>,
    ) => {
      state.goods.push( {goodsId: action.payload.goodsId, goodsName: action.payload.goodsName} );
    },
    removeGoods: (state, action: PayloadAction<{ goodsId: number }>) => {
      console.log(action.payload.goodsId)
    },
  },
});

export const { addGoods, removeGoods } = favoriteGoodsSlice.actions;
export default favoriteGoodsSlice.reducer;
