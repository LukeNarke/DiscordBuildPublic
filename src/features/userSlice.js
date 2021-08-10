import { createSlice } from "@reduxjs/toolkit";

// userSlice, b/c we are referring to the user
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  // reducers to control the user's login/logout of the state
  // reducer is something that listens to actions/changes in the state
  reducers: {
    // the payload is an object aka the user's info
    login: (state, action) => {
      state.user += action.payload;
    },
    // basically, make the user state back to empty
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
