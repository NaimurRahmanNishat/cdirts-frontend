import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "@/utils/getBaseUrl";
import type {
  CreateIssuePayload,
  EditIssuePayload,
  EditIssueResponse,
  GetAllIssuesArgs,
  IssueByIdResponse,
  PaginatedIssuesResponse,
  CreateIssueResponse
} from "@/types";

export const issueApi = createApi({
  reducerPath: "issueApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/issue`,
    credentials: "include",
  }),
  tagTypes: ["Issue"],
  endpoints: (builder) => ({
    // Create issue
    createIssue: builder.mutation<CreateIssueResponse, CreateIssuePayload>({
      query: (body) => ({
        url: "/create-issue",
        method: "POST",
        body,
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
      providesTags: (result) =>
        result
          ? [
              ...result.issues.map((i) => ({ type: "Issue" as const, id: i._id })),
              { type: "Issue", id: "LIST" },
            ]
          : [{ type: "Issue", id: "LIST" }],
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
  }),
});

export const {
  useCreateIssueMutation,
  useGetAllIssuesQuery,
  useGetIssueByIdQuery,
  useEditIssueMutation,
} = issueApi;
