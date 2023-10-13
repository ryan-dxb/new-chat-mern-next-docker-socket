import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "../../api/customBaseQuery";
import { IUser } from "../../types/user";
import { createSession } from "@/lib/session";
import {
  RegisterCredentials,
  RegisterResponse,
  SignInCredentials,
  SignInResponse,
} from "@/store/types/auth";
import { logout, setUser } from "../user/userSlice";

export interface VerifyResponse {
  success: boolean;
  message: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    loginUser: builder.mutation<SignInResponse, SignInCredentials>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted", args, queryFulfilled);

        try {
          const { data } = await queryFulfilled;

          console.log("onQueryStarted data", data);
          if (data.data.user) {
            dispatch(setUser(data.data));

            const sessionObj = {
              accessToken: data.data.accessToken,
              user: {
                id: data.data.user.id,
                email: data.data.user.email,
              },
            };

            await createSession(sessionObj);
          }
        } catch (err) {
          console.log("onQueryStarted error", err);
        }
      },

      transformResponse: (response: SignInResponse) => {
        return response;
      },

      transformErrorResponse: (response: {
        status: number;
        data: { error: { status: number; message: string } };
      }) => {
        return {
          status: response.status,
          message: response.data.error.message,
        };
      },
    }),

    registerUser: builder.mutation<RegisterResponse, RegisterCredentials>({
      query: (credentials: RegisterCredentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),

      transformResponse: (response: RegisterResponse) => {
        console.log("transformResponse", response);
        return response;
      },

      transformErrorResponse: (response: {
        status: number;
        data: { error: { status: number; message: string } };
      }) => {
        return {
          status: response.status,
          message: response.data.error.message,
        };
      },

      // onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   console.log("onQueryStarted", args, queryFulfilled);

      //   try {
      //     const data = queryFulfilled;
      //     console.log("onQueryStarted data", data);
      //   } catch (err) {
      //     console.log("onQueryStarted error", err);
      //   }
      // },
    }),

    // verifyUser: builder.mutation<VerifyResponse, any>({
    //   query: (credentials) => ({
    //     url: "auth/verify-email",
    //     method: "POST",
    //     body: credentials,
    //     credentials: "include",
    //   }),

    //   transformResponse: (response: any) => {
    //     console.log("transformResponse", response);
    //     return response;
    //   },

    //   async onQueryStarted(args, { dispatch, queryFulfilled }) {
    //     console.log("onQueryStarted", args, queryFulfilled);

    //     try {
    //       const data = await queryFulfilled;
    //       console.log("onQueryStarted data", data);

    //       if (data.data.success) {
    //       }
    //     } catch (err) {
    //       console.log("onQueryStarted error", err);
    //     }
    //   },
    // }),

    // sendVerificationEmail: builder.mutation<VerifyResponse, any>({
    //   query: (credentials) => ({
    //     url: "auth/resend-verify-email",
    //     method: "POST",
    //     body: credentials,
    //     credentials: "include",
    //   }),

    //   transformResponse: (response: any) => {
    //     console.log("transformResponse", response);
    //     return response;
    //   },

    //   async onQueryStarted(args, { dispatch, queryFulfilled }) {
    //     console.log("onQueryStarted", args, queryFulfilled);

    //     try {
    //       const data = await queryFulfilled;
    //       console.log("onQueryStarted data", data);

    //       if (data.data.success) {
    //       }
    //     } catch (err) {
    //       console.log("onQueryStarted error", err);
    //     }
    //   },
    // }),

    // forgotPassword: builder.mutation<VerifyResponse, any>({
    //   query: (credentials) => ({
    //     url: "auth/forgot-password",
    //     method: "POST",
    //     body: credentials,
    //     credentials: "include",
    //   }),

    //   transformResponse: (response: any) => {
    //     console.log("transformResponse", response);
    //     return response;
    //   },

    //   async onQueryStarted(args, { dispatch, queryFulfilled }) {
    //     console.log("onQueryStarted", args, queryFulfilled);

    //     try {
    //       const data = await queryFulfilled;
    //       console.log("onQueryStarted data", data);

    //       if (data.data.success) {
    //       }
    //     } catch (err) {
    //       console.log("onQueryStarted error", err);
    //     }
    //   },
    // }),

    // resetPassword: builder.mutation<VerifyResponse, any>({
    //   query: (credentials) => ({
    //     url: "auth/reset-password",
    //     method: "POST",
    //     body: credentials,
    //     credentials: "include",
    //   }),

    //   transformResponse: (response: any) => {
    //     console.log("transformResponse", response);
    //     return response;
    //   },

    //   async onQueryStarted(args, { dispatch, queryFulfilled }) {
    //     console.log("onQueryStarted", args, queryFulfilled);

    //     try {
    //       const data = await queryFulfilled;
    //       console.log("onQueryStarted data", data);

    //       if (data.data.success) {
    //       }
    //     } catch (err) {
    //       console.log("onQueryStarted error", err);
    //     }
    //   },
    // }),

    getUser: builder.query<IUser, any>({
      // Use accessToken from authSlice
      query: (accessToken) => ({
        url: "user/profile",
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted", args, queryFulfilled);

        try {
          const { data } = await queryFulfilled;

          console.log("onQueryStarted data", data);
        } catch (err) {
          console.log("onQueryStarted error", err);
        }
      },

      transformResponse: async (response: any) => {
        console.log("transformResponse", response);

        return response;
      },
    }),

    logoutUser: builder.mutation<VerifyResponse, any>({
      query: ({ token }) => ({
        url: "auth/logout",
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log("onQueryStarted", args, queryFulfilled);

        try {
          const data = await queryFulfilled;

          dispatch(logout());
        } catch (err) {
          console.log("onQueryStarted error", err);
        }
      },

      transformResponse: (response: any) => {
        console.log("transformResponse", response);
        return response;
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
  useLogoutUserMutation,
  // useVerifyUserMutation,
  // useSendVerificationEmailMutation,
  // useForgotPasswordMutation,
  // useResetPasswordMutation,
} = authApi;
