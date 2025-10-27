import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Reply type
export interface IReply {
  author: string; 
  comment: string;
  createdAt?: string;
}

// Review type
export interface IReview {
  _id: string;
  issue: string; 
  author: string; 
  comment: string;
  createdAt: string;
  replies: IReply[];
}

// Request body for creating a review
export interface CreateReviewRequest {
  issueId: string;
  data: {
    author: string; 
    comment: string;
  };
}

// Request body for adding a reply
export interface AddReplyRequest {
  reviewId: string;
  data: {
    author: string;
    comment: string;
  };
}

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
  }),
});

export const { useCreateReviewMutation, useAddReplyMutation } = reviewApi;
export default reviewApi;
