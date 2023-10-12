import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
// import { logout } from "../auth/authSlice";
import { RootState, store } from "../store";
import { setToken } from "../features/user/userSlice";

const baseUrl = `/api/v1`;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
  },
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

type RefreshTokenResponse =
  | {
      message: string;
      data: {
        id: string;
        accessToken: string;
      };
    }
  | undefined;

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: FetchArgs | string, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (
    (result.error && result.error.status === 401) ||
    result.error?.status === 403
  ) {
    console.log("refreshing token ERROR", result.error);

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            credentials: "include",
            url: "auth/refresh-token",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": "true",
            },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const refreshResultData = refreshResult.data as RefreshTokenResponse;
          console.log("refreshed token", refreshResultData?.data.accessToken);
          // Store the new tokens
          const accessToken = refreshResultData?.data.accessToken;

          console.log("refreshed token", accessToken);

          // Store new access token in redux
          api.dispatch(
            setToken({
              accessToken,
            })
          );
          // Modify the headers to add the access token
          console.log("extraOptions", args);

          let { headers } = args as FetchArgs;
          headers = {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          };

          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
          console.log("refreshed token", result);
        } else {
          // api.dispatch(logout());
          console.log("refreshed token error", refreshResult);

          // window.location.href = "/auth/login";
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchBase;
