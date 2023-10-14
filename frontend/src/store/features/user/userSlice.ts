import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IUser, UserModel } from "../../types/user";

interface UserState {
  userDetails: UserModel;
  token: string;
}

const initialState: UserState = {
  userDetails: {
    id: "",
    email: "",
    username: "",
    status: "",
    firstName: "",
    lastName: "",
    avatar: "",
  },
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("setUser action", action);

      state.userDetails = action.payload.user;
      state.token = action.payload.accessToken;
    },
    setToken: (state, action) => {
      console.log("setToken action", action);

      state.token = action.payload.accessToken;
    },

    logout: () => {
      return initialState;
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.userDetails;

export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
