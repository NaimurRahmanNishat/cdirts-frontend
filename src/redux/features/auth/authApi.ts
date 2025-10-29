/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ActivateUserPayload, ActivateUserResponse, ForgotPasswordPayload, ForgotPasswordResponse, LoginResponse, LogoutResponse, RefreshTokenResponse, RegisterResponse, ResetPasswordPayload, ResetPasswordResponse, SocialAuthPayload, SocialAuthResponse, UpdateProfilePayload, UpdateProfileResponse, UserLoginPayload, UserRegisterPayload } from "@/types";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query/react";
import { setUser, logout, type AuthState } from "@/redux/features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/auth`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
  let result = await baseQuery(args, api, extraOptions);

  const skipReauthUrls = ["/login", "/register", "/refresh-token", "/forgot-password", "/reset-password"];
  const url = typeof args === "string" ? args : args.url;

  // If only user login and url skip if not then refresh 
  const state = api.getState() as { auth: AuthState };
  const isAuthenticated = state.auth.isAuthenticated;

  if (result.error && result.error.status === 401 && !skipReauthUrls.includes(url) && isAuthenticated) {
    console.log("Access token expired, attempting refresh...");

    try {
      const refreshResult = await baseQuery(
        { url: "/refresh-token", method: "POST" },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const refreshData = refreshResult.data as RefreshTokenResponse;

        if (refreshData.success && refreshData.data) {
          console.log("Token refreshed successfully");
          api.dispatch(setUser(refreshData.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.error("Refresh token invalid, logging out");
          api.dispatch(logout());
        }
      } else {
        console.error("Refresh token failed, logging out");
        api.dispatch(logout());
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      api.dispatch(logout());
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    // Register user
    register: builder.mutation<RegisterResponse, UserRegisterPayload>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Activate user account
    activateUser: builder.mutation<ActivateUserResponse, ActivateUserPayload>({
      query: (data) => ({
        url: "/activate-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Login user
    login: builder.mutation<LoginResponse, UserLoginPayload>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "User"],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data) {
            // User data automatically dispatched from baseQuery
            console.log("Login successful, user data stored");
          }
        } catch (error) {
          console.error("Login onQueryStarted error:", error);
        }
      },
    }),

    // Refresh access token
    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => ({
        url: "/refresh-token",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // Social authentication
    socialAuth: builder.mutation<SocialAuthResponse, SocialAuthPayload>({
      query: (data) => ({
        url: "/social-auth",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // Forgot password
    forgotPassword: builder.mutation<ForgotPasswordResponse,ForgotPasswordPayload>({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // Reset password
    resetPassword: builder.mutation<ResetPasswordResponse,ResetPasswordPayload>({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // Logout user
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include", 
      }),
      invalidatesTags: ["Auth", "User"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout()); // Redux + LocalStorage clear
          console.log("Logout successful - local state cleared");
        } catch (error) {
          console.error("Logout error:", error);
          dispatch(logout()); // Redux + LocalStorage clear
        }
      },
    }),

    // Update user profile
    updateProfile: builder.mutation< UpdateProfileResponse, UpdateProfilePayload >({
      query: (data) => ({
        url: "/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Get user profile
    getCurrentUser: builder.query<LoginResponse, void>({
      query: () => ({ url: "/refresh-token", method: "POST" }),
      providesTags: ["User"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success && data.data) {
            dispatch(setUser(data.data)); // Redux + LocalStorage update
          }
        } catch (error: any) {
          if (error?.error?.status === 401) {
            dispatch(logout());
          }
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useActivateUserMutation, useLoginMutation, useRefreshTokenMutation, useSocialAuthMutation, useForgotPasswordMutation, useResetPasswordMutation, useLogoutMutation, useUpdateProfileMutation, useGetCurrentUserQuery } = authApi;

