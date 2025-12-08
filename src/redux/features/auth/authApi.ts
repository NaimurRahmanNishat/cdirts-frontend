
// src/redux/features/auth/authApi.ts
import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ActivateUserPayload,
  ActivateUserResponse,
  DeleteCategoryAdminResponse,
  EditProfileByIdPayload,
  EditProfileByIdResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  GetAllCategoryAdminsResponse,
  GetAllUsersResponse,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  RegisterResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  SocialAuthPayload,
  SocialAuthResponse,
  TAuthUser,
  UpdateCategoryAdminPayload,
  UpdateCategoryAdminResponse,
  UserLoginPayload,
  UserRegisterPayload,
} from "@/types/authType";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/auth`,
    credentials: "include", // Cookie send
  }),
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            // Redux store update after user save
            dispatch({ type: "auth/setUser", payload: data.data });
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    // 4. Refresh access token
    refreshToken: builder.mutation<RefreshTokenResponse, { userId: string }>({
      query: (data) => ({
        url: "/refresh-token",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            // Redux store update
            dispatch({ type: "auth/setUser", payload: data.data });
          }
        } catch (err) {
          // Refresh fail then logout
          console.error("Token refresh failed:", err);
          dispatch({ type: "auth/logout" });
        }
      },
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

    // 9. edit profile by id - FIXED WITH PROPER STATE MANAGEMENT
    editProfileById: builder.mutation<EditProfileByIdResponse,EditProfileByIdPayload>({
      query: ({id, ...data }) => ({
        url: `/update-profile/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // 10. Get all user (access by super-admin and category-admin)
    getAllUser: builder.query<GetAllUsersResponse, void>({
      query: () => ({
        url: "/all-users",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    // 11. get all category admins (access by super-admin and category-admin)
    getAllUsersAndCategoryAdmins: builder.query<GetAllCategoryAdminsResponse, void>({
      query: () => ({ url: "/category-admins", method: "GET" }),
      providesTags: ["User"],
    }),

    // 12. update category admin (access by super-admin)
    updateCategoryAdmin: builder.mutation<UpdateCategoryAdminResponse,UpdateCategoryAdminPayload>({
      query: ({ _id, category, division }) => ({
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

    // 14. get current user profile
    getCurrentUser: builder.query<{success: boolean; message: string; data: TAuthUser}, void>({
      query: () => ({
        url: "/current-user",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivateUserMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useSocialAuthMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useEditProfileByIdMutation,
  useGetAllUserQuery,
  useGetAllUsersAndCategoryAdminsQuery,
  useUpdateCategoryAdminMutation,
  useDeleteCategoryAdminMutation,
  useGetCurrentUserQuery,
} = authApi;
