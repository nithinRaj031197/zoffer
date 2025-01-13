import { baseApi } from "./baseApi";
import { removeTokens } from "../utils/tokenStorage";

interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

interface SignupResponse {
  message: string;
  token?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const authApi = baseApi.injectEndpoints({
  //   overrideExisting: false,
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (userData) => ({
        url: "auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (userData) => ({
        url: "auth/signin",
        method: "POST",
        body: userData,
      }),
      //   async onQueryStarted(arg, { queryFulfilled }) {
      //     try {
      //       const { data } = await queryFulfilled;
      //       console.log(data, "data------");
      //       await saveTokens(data.accessToken, data.refreshToken);
      //     } catch (err) {
      //       console.error("Failed to save tokens:", err);
      //     }
      //   },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          await removeTokens();
        } catch (err) {
          console.error("Failed to remove tokens:", err);
        }
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useLogoutMutation } = authApi;
