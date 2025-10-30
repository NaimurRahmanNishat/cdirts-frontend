import type { AddReplyRequest, CreateReviewRequest, IReview } from "@/types";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/review`,
    credentials: "include",
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    // Create a new review
    createReview: builder.mutation<IReview, CreateReviewRequest>({
      query: ({ issueId, data }) => ({
        url: `/create-review/${issueId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),

    // Add a reply to an existing review
    addReply: builder.mutation<IReview, AddReplyRequest>({
      query: ({ reviewId, data }) => ({
        url: `/add-reply/${reviewId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),

    // Get all reviews for an issue
    getReviewsByIssue: builder.query<IReview[], string>({
      query: (issueId) => `/issue/${issueId}`,
      providesTags: ["Review"],
    }),
  }),
});

export const { useCreateReviewMutation, useAddReplyMutation, useGetReviewsByIssueQuery } = reviewApi;
export default reviewApi;
