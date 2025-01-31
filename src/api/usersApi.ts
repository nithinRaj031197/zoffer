import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => ({
        url: "users/current/info",
        method: "GET",
      }),
    }),
    userPreferences: builder.mutation({
      query: (ids: number[]) => ({
        url: "users/preferences",
        method: "POST",
        body: {
          preferences: ids,
        },
      }),
    }),
  }),
});

export const { useGetUserInfoQuery, useUserPreferencesMutation } = usersApi;
