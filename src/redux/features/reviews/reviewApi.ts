import type { IReview } from "@/types";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/review`,
    credentials: "include",
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    // Create Review (comment)
    createReview: builder.mutation<IReview, { issueId: string; comment: string }>({
      query: ({ issueId, comment }) => ({
        url: `/create-review/${issueId}`,
        method: "POST",
        body: { comment },
      }),
      invalidatesTags: (_result, _error, { issueId }) => [{ type: "Review", id: issueId }],
    }),

    // Add Reply
    addReply: builder.mutation<IReview, { reviewId: string; comment: string; issueId: string }>({
      query: ({ reviewId, comment }) => ({
        url: `/add-reply/${reviewId}`,
        method: "POST",
        body: { comment },
      }),
      invalidatesTags: (_result, _error, { issueId }) => [{ type: "Review", id: issueId }],
    }),

    // Get all Reviews by Issue
    getReviewsByIssue: builder.query<IReview[], string>({
      query: (issueId) => `/issue/${issueId}`,
      providesTags: (_result, _error, issueId) => [{ type: "Review", id: issueId }],
    }),
  }),
});

export const { useCreateReviewMutation, useAddReplyMutation, useGetReviewsByIssueQuery } = reviewApi;
