import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IUser } from "../../types";

interface AuthState {
  user: {
    id?: string;
    email?: string;
    username?: string;
    createdAt?: string;
    friends?: string[];
    updatedAt?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
  token: string;
}

const initialState: AuthState = {
  user: {
    id: "",
    email: "",
    username: "",
    createdAt: "",
    friends: [],
    updatedAt: "",
    firstName: "",
    lastName: "",
    avatar: "",
  },
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log("setCredentials", action.payload.data);

      state.user = action.payload.data.user;
      state.token = action.payload.data.accessToken;
    },

    setAccessToken: (state, action) => {
      console.log("setAccessToken", action.payload.token);

      state.token = action.payload.token;
    },
    logout: () => initialState,
  },
});

export const { setCredentials, setAccessToken, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const selectToken = (state: RootState) => state.auth.token;

export const getAuthenticatedUser = (state: RootState) => {
  return {
    user: selectUser(state),
    token: selectToken(state),
  };
};
export default authSlice.reducer;
