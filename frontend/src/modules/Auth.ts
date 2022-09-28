import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  authToken: '',
  isLogin : false,
};

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
