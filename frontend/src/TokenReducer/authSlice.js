import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, refreshToken } = action.payload;
      state.token = token;
      state.user = user;
      state.refreshToken = refreshToken;
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRefreshToken = (state) => state.auth.refreshToken;