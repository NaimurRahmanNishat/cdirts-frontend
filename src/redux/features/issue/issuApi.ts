import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "@/utils/getBaseUrl";
import type {
  CreateIssuePayload,
  EditIssuePayload,
  EditIssueResponse,
  GetAllIssuesArgs,
  IssueByIdResponse,
  PaginatedIssuesResponse,
  CreateIssueResponse,
  ApproveIssueResponse,
  IReview
} from "@/types";

export const issueApi = createApi({
  reducerPath: "issueApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/issue`,
    credentials: "include",
  }),
  tagTypes: ["Issue", "Review"],
  endpoints: (builder) => ({
    // Create issue
    createIssue: builder.mutation<CreateIssueResponse, CreateIssuePayload>({
      query: (newIssue) => ({
        url: "/create-issue",
        method: "POST",
        body: newIssue,
        credentials: "include",
      }),
      invalidatesTags: ["Issue"],
    }),

    // Approve issue
    approveIssue: builder.mutation<ApproveIssueResponse, string>({
      query: (issueId) => ({
        url: `/approve/${issueId}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Issue"],
    }),

    // Get all issues with query params
    getAllIssues: builder.query<PaginatedIssuesResponse, GetAllIssuesArgs | void>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          if (args.page) params.append("page", String(args.page));
          if (args.limit) params.append("limit", String(args.limit));
          if (args.sort) params.append("sort", args.sort);
          if (args.status) params.append("status", args.status);
          if (args.division) params.append("division", args.division);
          if (args.category) params.append("category", args.category);
          if (args.search) params.append("search", args.search);
        }
        const qs = params.toString();
        return {
          url: `/all-issues${qs ? `?${qs}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Issue"],
    }),

    // Get single issue by id
    getIssueById: builder.query<IssueByIdResponse, string>({
      query: (issueId) => ({
        url: `/${issueId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Issue", id }],
    }),

    // Edit issue
    editIssue: builder.mutation<EditIssueResponse, { issueId: string; data: EditIssuePayload }>({
      query: ({ issueId, data }) => ({
        url: `/edit-issue/${issueId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, _error, { issueId }) =>
        result ? [{ type: "Issue", id: issueId }, { type: "Issue", id: "LIST" }] : [],
    }),

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

export const {
  useCreateIssueMutation,
  useApproveIssueMutation,
  useGetAllIssuesQuery,
  useGetIssueByIdQuery,
  useEditIssueMutation,
  useCreateReviewMutation,
  useAddReplyMutation,
  useGetReviewsByIssueQuery,
} = issueApi;
