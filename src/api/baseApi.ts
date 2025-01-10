import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { getAccessToken, getRefreshToken, removeTokens, saveTokens } from "../utils/tokenStorage";
import { API_BASE_URL } from "./urls";

// Define a type for the refresh token response
interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Define a base query for API requests
const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:8082/zofferly/api/",
  baseUrl: API_BASE_URL + "/api/",
  prepareHeaders: async (headers) => {
    const token = await getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// Enhanced base query with refresh token logic
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // If access_token is expired (status 401)
  if (result?.error?.status === 401) {
    console.warn("Access token expired. Attempting to refresh token...");

    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      console.warn("No refresh token available. Logging out...");
      await removeTokens();
      return result;
    }

    // Attempt to refresh token
    const refreshResult = await baseQuery(
      {
        url: "auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // Explicitly assert refreshResult.data as RefreshTokenResponse
      const { accessToken, refreshToken: newRefreshToken } = refreshResult.data as RefreshTokenResponse;

      // Save the new tokens
      await saveTokens(accessToken, newRefreshToken);

      // Retry the original request with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.warn("Failed to refresh token. Logging out...");
      await removeTokens();
    }
  }

  return result;
};

// Create base API
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
