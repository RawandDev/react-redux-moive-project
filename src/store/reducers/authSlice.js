/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
// import { auth } from "../../firebase/firebase";

const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: "",
    email: "",
    password: "",
  },
  reducers: {
    signup: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    login: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    // logout: () => {
    //   auth.signOut();
    // },
    currentUser: (state, action) => {
      state.uid = action.payload.user.uid;
      state.email = action.payload.user.email;
      state.password = action.payload.user.password;
    },
  },
});

export const { signup, login, currentUser } = userSlice.actions;

export default userSlice.reducer;
