import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  authToken: '',
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
  },
});

export const { setAuthToken, removeAuthToken } = userAuthSlice.actions;
export default userAuthSlice.reducer;
