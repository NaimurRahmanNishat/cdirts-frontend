/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/features/auth/authApi.ts
import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type BaseQueryApi } from "@reduxjs/toolkit/query/react";
import { setUser, logout, type AuthState } from "@/redux/features/auth/authSlice";
import type { ActivateUserPayload, ActivateUserResponse, DeleteCategoryAdminResponse, ForgotPasswordPayload, ForgotPasswordResponse, GetAllCategoryAdminsResponse, GetAllUsersResponse, LoginResponse, LogoutResponse, RefreshTokenResponse, RegisterResponse, ResetPasswordPayload, ResetPasswordResponse, SocialAuthPayload, SocialAuthResponse, UpdateCategoryAdminPayload, UpdateCategoryAdminResponse, UpdateUserProfilePayload, UpdateUserProfileResponse, UserLoginPayload, UserRegisterPayload } from "@/types/authType";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/v1/auth`,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<FetchArgs, BaseQueryApi> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  const skipReauthUrls = ["/login", "/register", "/activate-user", "/refresh-token", "/forgot-password", "/reset-password"];
  const url = typeof args === "string" ? args : args.url;

  // If only user login and url skip if not then refresh 
  const state = api.getState() as { auth: AuthState };
  const isAuthenticated = state.auth.isAuthenticated;

  if (result?.error && result?.error.status === 401 && !skipReauthUrls.includes(url) && isAuthenticated) {
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
    // 1. Register user
    register: builder.mutation<RegisterResponse, UserRegisterPayload>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    // 2. Activate user account
    activateUser: builder.mutation<ActivateUserResponse, ActivateUserPayload>({
      query: (data) => ({
        url: "/activate-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // 3. Login user
    login: builder.mutation<LoginResponse, UserLoginPayload>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // 4. Refresh access token
    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => ({
        url: "/refresh-token",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // 5. Social authentication
    socialAuth: builder.mutation<SocialAuthResponse, SocialAuthPayload>({
      query: (data) => ({
        url: "/social-auth",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // 6. Forgot password
    forgotPassword: builder.mutation<ForgotPasswordResponse,ForgotPasswordPayload>({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // 7.  Reset password
    resetPassword: builder.mutation<ResetPasswordResponse,ResetPasswordPayload>({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // 8. Logout user
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include", 
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // 9. Update user profile
    updateProfile: builder.mutation< UpdateUserProfileResponse, UpdateUserProfilePayload >({
      query: (data) => ({
        url: "/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // 10. Get all user (access by super-admin and category-admin)
    getAllUser: builder.query<GetAllUsersResponse, void>({
      query: () => ({ url: "/all-users", method: "GET", credentials: "include" }),
      providesTags: ["User"],
    }),

    // 11. get all category admins (access by super-admin and category-admin)
    getAllUsersAndCategoryAdmins: builder.query<GetAllCategoryAdminsResponse, void>({
      query: () => ({ url: "/category-admins", method: "GET" }),
      providesTags: ["User"],
    }),

    // 12. update category admin (access by super-admin)
    updateCategoryAdmin: builder.mutation<UpdateCategoryAdminResponse, UpdateCategoryAdminPayload>({
      query: ({_id, category, division}) => ({
        url: `/category-admin/${_id}`,
        method: "PATCH",
        body: { category, division },
      }),
      invalidatesTags: ["User"],
    }),

    // 13. delete category admin (access by super-admin)
    deleteCategoryAdmin: builder.mutation<DeleteCategoryAdminResponse, string>({
      query: (id) => ({
        url: `/category-admin/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // 14. get current user
    getCurrentUser: builder.query<any, void>({
      query: () => ({ url: "/refresh-token", method: "GET" }),
      providesTags: ["User"],
    })
    
  }),
});

export const { useRegisterMutation, useActivateUserMutation, useLoginMutation, useRefreshTokenMutation, useSocialAuthMutation, useForgotPasswordMutation, useResetPasswordMutation, useLogoutMutation, useUpdateProfileMutation, useGetAllUserQuery, useGetAllUsersAndCategoryAdminsQuery, useUpdateCategoryAdminMutation, useDeleteCategoryAdminMutation, useGetCurrentUserQuery } = authApi;

