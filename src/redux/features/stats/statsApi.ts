import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Admin Stats Response

export interface MonthlyIssue {
  month: number; 
  count: number; 
}
export interface AdminStatsResponse {
  success: boolean;
  message: string;
  data: {
    totalIssues: number;
    pendingIssues: number;
    inProgressIssues: number;
    solvedIssues: number;
    monthlyIssues: MonthlyIssue[];
  };
}

// User Stats Response
export interface UserStatsResponse {
  success: boolean;
  message: string;
  data: {
    totalIssues: number;
    totalReviewAndComment: number;
    totalSolved: number;
    totalPending: number;
    totalInProgress: number;
  };
}

// Category Admin Stats Response
export interface CategoryAdminStatsResponse {
  success: boolean;
  message: string;
  data: {
    category: string;
    totalIssues: number;
    pendingIssues: number;
    inProgressIssues: number;
    solvedIssues: number;
    monthlyPostIssue: [];
  };
}


const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/stats`,
    credentials: "include",
  }),
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    // Get user stats by email
    getUserStats: builder.query<UserStatsResponse, string>({
      query: (email) => ({
        url: `/user-stats/${email}`,
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),

    // Get admin stats (no args)
    getAdminStats: builder.query<AdminStatsResponse, void>({
      query: () => ({
        url: `/admin-stats`,
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),

    // Get category admin stats (no args)
    getCategoryAdminStats: builder.query<CategoryAdminStatsResponse, void>({
      query: () => ({
        url: `/category-admin-stats`,
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetAdminStatsQuery, useGetUserStatsQuery, useGetCategoryAdminStatsQuery } = statsApi;
export default statsApi;
