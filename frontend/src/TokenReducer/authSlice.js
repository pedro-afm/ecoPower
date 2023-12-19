import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('user') || null,
  refreshToken: null,
  userChargingInformation: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, refreshToken, userChargingInformation } = action.payload;
      state.token = token;
      state.user = user;
      state.refreshToken = refreshToken;
      state.userChargingInformation = userChargingInformation;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
      state.refreshToken = null;
      state.userChargingInformation = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRefreshToken = (state) => state.auth.refreshToken;
export const selectCurrentUserChargingInformation = (state) => state.auth.userChargingInformation;
