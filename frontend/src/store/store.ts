import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import sidebarReducer from "./features/sidebar/sidebarSlice";
import userReducer from "./features/user/userSlice";
import friendReducer from "./features/friend/friendSlice";
import conversationReducer from "./features/conversation/conversationSlice";

import { authApi } from "./features/auth/authApi";
import { userApi } from "./features/user/userApi";
import { friendApi } from "./features/friend/friendApi";
import { conversationApi } from "./features/conversation/conversationApi";

import customStorage from "./customStorage";

const persistConfig = {
  key: "user",
  storage: customStorage,
  whitelist: ["userDetails", "token"],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [friendApi.reducerPath]: friendApi.reducer,
  [conversationApi.reducerPath]: conversationApi.reducer,
  user: persistReducer(persistConfig, userReducer),
  friend: friendReducer,
  sidebar: sidebarReducer,
  conversation: conversationReducer,
});

export const store = configureStore({
  reducer: rootReducer,

  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      authApi.middleware,
      userApi.middleware,
      friendApi.middleware,
      conversationApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
