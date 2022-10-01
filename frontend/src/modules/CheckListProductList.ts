import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import { stat } from 'fs/promises';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';
import axios from 'axios';

const API_URL = 'https://j7d108.p.ssafy.io/api/checklist';
interface MyKnownError {
  errorMessage: string;
}

export interface BasicProduct {
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
  basicEmpty?:boolean;
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
  try {
    const { data } = await axios.get(API_URL + `/${checklistId}`);
    console.log('get CheckList by id at redux: ', data);
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const updateCheckListStatus = createAsyncThunk('updateCheckLists', async (checklistId, thunkAPI) => {
  try {
    const { data } = await axios({
      url : API_URL + `/status/${checklistId}`,
      method : 'put',
      data: {
        initialState
      }
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
})

export const checkListProductsSlice = createSlice({
  name: 'checklistProducts',
  initialState,
  reducers: {
    addBasicProducts: (state, action: PayloadAction<BasicProduct>) => {
      const isDuplicate = state.checklistBasicItems.find(
        products => products.basicProductId == action.payload.basicProductId,
      );
      if (isDuplicate) {
        console.log('중복');
      } else {
        state.checklistBasicItems.push({
          id: -1,
          basicProductId: action.payload.basicProductId,
          basicProductName: action.payload.basicProductName,
          status: false,
        });
      }
    },
    removeBasicProducts: (state, action: PayloadAction<number | undefined>) => {
      const data = state.checklistBasicItems.filter(products => {
        return products.basicProductId != action.payload;
      });
      state.checklistBasicItems = data;
    },
    updateBasicProductsStatus: (state, action: PayloadAction<string>) => {
      console.log('update');

      const data = state.checklistBasicItems.find(products => {
        console.log(products.basicProductName, action.payload);
        return products.basicProductName == action.payload;
      });
      console.log(current(data));

      if (typeof data !== 'undefined') {
        data.status = !data?.status;
        console.log(current(data));
      } else {
        console.error('error');
      }
    },
    addCustomProducts: (state, action: PayloadAction<CustomProduct>) => {
      const isDuplicate = state.checklistCustomItems.find(
        products =>
          products.customProductName == action.payload.customProductName,
      );
      if (isDuplicate) {
        console.log('중복');
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
        return products.customProductName != action.payload;
      });
      state.checklistCustomItems = data;
    },
    updateCustomProductStatus: (state, action: PayloadAction<string>) => {
      const data = state.checklistCustomItems.find(products => {
        return products.customProductName == action.payload;
      });
      if (typeof data !== 'undefined') {
        data.status = !data?.status;
      } else {
        console.error('error');
      }
    },
    setInitialState: (state, action: PayloadAction<Initial>) => {
      console.log(
        'set initialState',
        action.payload.checklistBasicItems,
        action.payload.checklistCustomItems,
      );

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
      console.log(current(state), action.payload);
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
