import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import { stat } from 'fs/promises';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';
import type { FavoritePageData } from '@apis/favoriteApi';
import axios from 'axios';
const API_URL = 'https://j7d108.p.ssafy.io/api/favorite';
interface FetchItems {
  basicProductId: number;
  goodsId: number;
  goodsName: string;
  img:string;
  measure: string;
  priceGapOff:number;
  priceGapOn: number;
  recentPriceOff: number;
  recentPriceOn: number;
}

interface SelectedGoods {
  goodsId: number;
  goodsName: string;
  img?:string;
}
interface MyKnownError {
  errorMessage: string;
}

interface Initial {
  goods: SelectedGoods[];
}

const initialState: Initial = {
  goods: [],
};

export const getFavoritePageDataRedux = createAsyncThunk(
  'getFavorite',
  async () => {
    try {
      const { data } = await axios({
        url: API_URL + '/',
        method: 'GET',
      });
      console.log(data);
      return data;
    } catch (error) {}
  },
);

export const updateFavoriteItems = createAsyncThunk('updateFavoriteItem', async (goodsIdList : number[], thunkAPI) => {
  try {
    const { data } = await axios({
      url: API_URL + '/',
      method: 'post',
      data:{
        goodsIds : goodsIdList
      }
    });
    console.log(data);
    return data;
  } catch (error) {
    
  }
})

export const updateRecommendItem = createAsyncThunk('updateRecommendItem', async (goodsId: number, thunkAPI)=>{
  try {
    const { data } = await axios({
      url : API_URL + `/goods/${goodsId}/v2`,
      method:'POST',
      data : {
        goodsId,
      }
    });
    console.log(data);
    return data;
  } catch (error) {
    
  }
})

export const favoriteGoodsSlice = createSlice({
  name: 'favoriteGoods',
  initialState,
  reducers: {
    addGoods: (state, action: PayloadAction<SelectedGoods>) => {
      const isDuplicate = state.goods.find(
        (goods: { goodsId: number; goodsName: string }) =>
          goods.goodsId == action.payload.goodsId,
      );
      if (isDuplicate) {
        console.log('중복');
      } else {
        state.goods.unshift({
          goodsId: action.payload.goodsId,
          goodsName: action.payload.goodsName,
        });
      }
    },
    removeGoods: (state, action: PayloadAction<{ goodsId: number }>) => {
      const data = state.goods.filter(
        (goods: { goodsId: number; goodsName: string }) => {
          return goods.goodsId != action.payload.goodsId;
        },
      );
      state.goods = data;
    },
  },
  extraReducers: builder => {
    builder.addCase(getFavoritePageDataRedux.fulfilled, (state, action) => {
      // console.log(current(state), action.payload);
      const fetchList = action.payload.favoriteItems.map((item: FetchItems) => {
        return item;
      });
      console.log(fetchList);
      // state.goods = fetchList;
    });
    builder.addCase(updateFavoriteItems.fulfilled, (state, action) => {
      console.log(current(state), action.payload);
    });
    builder.addCase(updateRecommendItem.fulfilled, (state, action) => {
      console.log('updateRecommendItem :',current(state), action.payload);
      state.goods.push(action.payload);
    })
  },
});

export const { addGoods, removeGoods } = favoriteGoodsSlice.actions;
export default favoriteGoodsSlice.reducer;
