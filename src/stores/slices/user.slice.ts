import { createSlice } from "@reduxjs/toolkit";

type UserInfoState = {
  username: string;
  email: string;
  name: string;
  is_premium: boolean;
};

const initialState: UserInfoState = {
  username: "",
  email: "",
  name: "",
  is_premium: false,
};

const UserInfoSlice = createSlice({
  name: "UserInfo",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      return state;
    },
 
    logout: (state) => {
      state.username = "";
      state.email = "";
      state.name = "";
      state.is_premium = false;
      return state;
    },
  },
});

export const { actions: UserInfoActions, reducer: UserInfoReducer } = UserInfoSlice;
