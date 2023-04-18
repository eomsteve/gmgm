import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';
import { getCheckList, updateCheckListStatusApi } from '@src/routers/APIs/checkList.Api';
import { client } from '@src/routers/APIs/client';

interface MyKnownError {
  errorMessage: string;
}

export interface BasicProduct {
  priceGapOn: number;
  priceGapOff: number;
  recentPriceOn: number;
  recentPriceOff: number;
  id: number;
  basicProductId: number;
  basicProductName: string;
  status: boolean;
  productImg?: string;
}

export interface CustomProduct {
  id: number;
  customProductName: string;
  status: boolean;
}

interface Initial {
  empty?: boolean;
  basicEmpty?: boolean;
  customEmpty?: boolean;
  checklistBasicItems: BasicProduct[];
  checklistCustomItems: CustomProduct[];
  tempList: BasicProduct[];
}

const initialState: Initial = {
  checklistBasicItems: [],
  checklistCustomItems: [],
  tempList: [],
};

export const getCheckLists = createAsyncThunk<
  Initial,
  string | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: MyKnownError;
  }
>('getList', async (checklistId, thunkAPI) => {
  return getCheckList(checklistId);
});

export const updateCheckListStatus = createAsyncThunk(
  'updateCheckLists',
  async (checklistId, thunkAPI) => {
    const { data } = await client.put(
      `/api/checklist/status/${checklistId}`,
      initialState,
    );
    return data;
  },
);

export const checkListProductsSlice = createSlice({
  name: 'checklistProducts',
  initialState,
  reducers: {
    addBasicProducts: (state, action: PayloadAction<BasicProduct>) => {
      const isDuplicate = state.checklistBasicItems.find(
        products => products.basicProductId === action.payload.basicProductId,
      );
      if (isDuplicate) {
      } else {
        state.checklistBasicItems.unshift({
          id: -1,
          basicProductId: action.payload.basicProductId,
          basicProductName: action.payload.basicProductName,
          recentPriceOff: 0,
          recentPriceOn: 0,
          priceGapOff: 0,
          priceGapOn: 0,
          status: false,
        });
      }
    },
    removeBasicProducts: (state, action: PayloadAction<number | undefined>) => {
      const data = state.checklistBasicItems.filter(products => {
        return products.basicProductId !== action.payload;
      });
      state.checklistBasicItems = data;
    },
    updateBasicProductsStatus: (state, action: PayloadAction<string>) => {
      const data = state.checklistBasicItems.find(products => {
        return products.basicProductName === action.payload;
      });

      if (typeof data !== 'undefined') {
        data.status = !data?.status;
      } else {
        console.error('error');
      }
    },
    addCustomProducts: (state, action: PayloadAction<CustomProduct>) => {
      const isDuplicate = state.checklistCustomItems.find(
        products =>
          products.customProductName === action.payload.customProductName,
      );
      if (isDuplicate) {
      } else {
        state.checklistCustomItems.push({
          id: action.payload.id,
          customProductName: action.payload.customProductName,
          status: action.payload.status,
        });
      }
    },
    removeCustomProducts: (state, action: PayloadAction<string>) => {
      const data = state.checklistCustomItems.filter(products => {
        return products.customProductName !== action.payload;
      });
      state.checklistCustomItems = data;
    },
    updateCustomProductStatus: (state, action: PayloadAction<string>) => {
      const data = state.checklistCustomItems.find(products => {
        return products.customProductName === action.payload;
      });
      if (typeof data !== 'undefined') {
        data.status = !data?.status;
      } else {
        console.error('error');
      }
    },
    setInitialState: (state, action: PayloadAction<Initial>) => {
      state.checklistBasicItems = action.payload.checklistBasicItems;
      state.checklistCustomItems = action.payload.checklistCustomItems;
    },
    setInitialStateWhenUnMounted: state => {
      state.checklistBasicItems = [];
      state.checklistCustomItems = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getCheckLists.fulfilled, (state, action) => {
      state.checklistBasicItems = action.payload.checklistBasicItems;
      state.checklistCustomItems = action.payload.checklistCustomItems;
    });
  },
});

export const {
  addBasicProducts,
  removeBasicProducts,
  addCustomProducts,
  updateBasicProductsStatus,
  updateCustomProductStatus,
  removeCustomProducts,
  setInitialState,
  setInitialStateWhenUnMounted,
} = checkListProductsSlice.actions;

export default checkListProductsSlice.reducer;
