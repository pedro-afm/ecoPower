import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('user') || null,
  userChargingInformation: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, userChargingInformation } = action.payload;
      state.token = token;
      state.user = user; 
      state.userChargingInformation = userChargingInformation;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userDetails', JSON.stringify(userChargingInformation));
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
      state.userChargingInformation = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userDetails');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUserChargingInformation = (state) => state.auth.userChargingInformation;
