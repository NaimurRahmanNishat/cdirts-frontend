/* eslint-disable @typescript-eslint/no-explicit-any */
// redux/features/review/reviewApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "@/utils/getBaseUrl";
import type {
  ReviewsResponse,
  CreateReviewPayload,
  ReplyToReviewPayload,
  EditReviewPayload,
  DeleteReviewPayload,
} from "@/types/review";

interface GetReviewsParams {
  issueId: string;
  page?: number;
  limit?: number;
}

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/review`,
    credentials: "include",
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    // Get reviews for a specific issue
    getReviewsByIssue: builder.query<ReviewsResponse, GetReviewsParams>({
      query: ({ issueId, page = 1, limit = 10 }) => ({
        url: `/issue/${issueId}`,
        params: { page, limit },
      }),
      providesTags: (_result, _error, { issueId }) => [
        { type: "Reviews", id: issueId },
      ], 
    }),

    // Create a new review
    createReview: builder.mutation<any, { issueId: string; data: CreateReviewPayload }>({
      query: ({ issueId, data }) => ({
        url: `/create-review/${issueId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { issueId }) => [
        { type: "Reviews", id: issueId },
      ],
    }),

    // Reply to a review
    replyToReview: builder.mutation<any, { reviewId: string; data: ReplyToReviewPayload }>({
      query: ({ reviewId, data }) => ({
        url: `/reply/${reviewId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),

    // Edit a review or reply
    editReview: builder.mutation<any, { reviewId: string; data: EditReviewPayload }>({
      query: ({ reviewId, data }) => ({
        url: `/edit-review/${reviewId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),

    // Delete a review or reply
    deleteReview: builder.mutation<any, { reviewId: string; data?: DeleteReviewPayload }>({
      query: ({ reviewId, data }) => ({
        url: `/${reviewId}`,
        method: "DELETE",
        body: data || {},
      }),
      invalidatesTags: ["Reviews"],
    }),

    // Get all reviews for admin
    getAllReviewsForAdmin: builder.query<any, void>({
      query: () => "/",
      providesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetReviewsByIssueQuery,
  useCreateReviewMutation,
  useReplyToReviewMutation,
  useEditReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsForAdminQuery,
} = reviewApi;