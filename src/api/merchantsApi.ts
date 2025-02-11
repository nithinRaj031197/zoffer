import { baseApi } from "./baseApi";

const merchantsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getOtp: builder.mutation({
      query: ({ mobileNumber }: { mobileNumber: string }) => ({
        url: "merchants/otp/send",
        method: "POST",
        params: {
          mobileNumber,
        },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ mobileNumber, businessName, otp }: { mobileNumber: string; businessName: string; otp: string }) => ({
        url: "merchants/otp/verify",
        method: "POST",
        body: {
          businessName,
          mobileNumber,
          otp,
        },
      }),
    }),
    getMechantById: builder.query({
      query: ({ merchantId }: { merchantId: number }) => ({
        url: `merchants/${merchantId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOtpMutation, useVerifyOtpMutation, useLazyGetMechantByIdQuery } = merchantsApi;
