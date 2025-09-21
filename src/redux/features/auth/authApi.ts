/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type UserRole = "user" | "admin";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  otpCode?: string;
  otpExpire?: Date;
  otpRequestedAt?: Date;
  isVerified?: boolean;
  passwordResetToken?: string;
  passwordResetExpire?: Date;
  passwordChangedAt?: Date;
  role?: UserRole;
  phone?: string;
  nid?: string;
}

// Generic API response
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface UserRegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  nid: string;
}

export interface ActivateUserPayload {
  token: string;
  activationCode: string;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  otp: string;
  newPassword: string;
}

export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse, UserRegisterPayload>({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Auth"],
    }),
    activateUser: builder.mutation<ApiResponse, ActivateUserPayload>({
      query: (data) => ({
        url: "/activate-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation<ApiResponse, UserLoginPayload>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    refreshToken: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: "/refresh-token",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    forgotPassword: builder.mutation<ApiResponse, ForgotPasswordPayload>({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: builder.mutation<ApiResponse, ResetPasswordPayload>({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    updateProfile: builder.mutation<ApiResponse<TUser>, UpdateProfilePayload>({
      query: (data) => ({
        url: "/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivateUserMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useLogoutMutation,
} = authApi;
