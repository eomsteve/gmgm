import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  accessToken: string;
  isLogin: boolean;
  userName: string;
  userId: number;
}

const initialState: UserState = {
  accessToken: '',
  isLogin: false,
  userName: '',
  userId: -1,
};

export type LogInUserREQ = {
  email: string;
  pwd: string;
};

const API_URL = 'https://j7d108.p.ssafy.io/api/user';
export const logInApiRedux = createAsyncThunk(
  'login',
  async (logInForm: LogInUserREQ) => {
    try {
      const { data } = await axios.post(API_URL + '/login', logInForm);
      localStorage.setItem('jwtToken', data.accessToken);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return 'error';
      } else {
        console.log(error);
        return 'unexpected error occurred';
      }
    }
  },
);

export const logOutApiRedux = createAsyncThunk(
  'logout',
  async (email: string) => {
    try {
      const { data } = await axios({
        url: API_URL + `/logout`,
        method: 'POST',
        data: { email },
      });
      localStorage.removeItem('jwtToken');
      console.log('logout');
      return data;
    } catch (error) {}
  },
);

export const userAuthSlice = createSlice({
  name: 'authHeader',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.accessToken = action.payload;
    },
    removeAuthToken: state => {
      state.accessToken = '';
    },
    isLogin: state => {
      state.isLogin = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logInApiRedux.fulfilled, (state, action) => {
        console.log('fullfiled', action.payload);
        if (action.payload != 'error') {
          state.isLogin = true;
          state.accessToken = action.payload.accessToken;
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${action.payload.accessToken}`;
        }
      })
      .addCase(logOutApiRedux.fulfilled, (state, action) => {
        state.isLogin = false;
        state.accessToken = '';
        axios.defaults.headers.common['Authorization'] = ``;
      });
  },
});

export const { setAuthToken, removeAuthToken } = userAuthSlice.actions;
export default userAuthSlice.reducer;
