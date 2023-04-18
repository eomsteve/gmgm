import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '@src/routers/APIs/client';
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

export const loginRedux = createAsyncThunk(
  'login',
  async (logInForm: LogInUserREQ) => {
    const { data } = await client.post('/api/user/login', logInForm);
    localStorage.setItem('jwtToken', data.accessToken);
    return data;
  },
);

const API_URL = 'http://localhost:8080/api/user';

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
      .addCase(loginRedux.fulfilled, (state, action) => {
        if (action.payload !== 'error') {
          state.isLogin = true;
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
