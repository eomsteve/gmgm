import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  authToken : string;
  isLogin : boolean;
  userName : string;
  userId : number;
}

const initialState : UserState = {
  authToken: '',
  isLogin : false,
  userName : '',
  userId : -1
};

export type LogInUserREQ = {
  email: string;
  pwd: string;
};

const API_URL = 'https://j7d108.p.ssafy.io/api/user';
export const logInApiRedux = createAsyncThunk('updateFavoriteItem', async (logInForm: LogInUserREQ) => {
  try {
    const { data } = await axios.post(API_URL + '/login', logInForm);
    localStorage.setItem("jwtToken", data.accessToken);
    return {status : true, data : data.accessToken};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      return error.message;
    } else {
      console.log(error);
      return 'unexpected error occurred';
    }
  }
});

export const userAuthSlice = createSlice({
  name: 'authHeader',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    removeAuthToken: state => {
      state.authToken = '';
    },
    isLogin : state => {
      state.isLogin = true;
    }
  },
});

export const { setAuthToken, removeAuthToken } = userAuthSlice.actions;
export default userAuthSlice.reducer;
