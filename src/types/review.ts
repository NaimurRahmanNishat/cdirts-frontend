// src/types/review.ts
export interface IAuthor {
  _id: string;
  name: string;
  email: string;
  avatar?: {
    url: string;
    public_id: string;
  };
}

export interface IReply {
  _id: string;
  author: IAuthor;
  comment: string;
  replies?: IReply[];
  createdAt: string;
  updatedAt: string;
}

export interface IReview {
  _id: string;
  issue: string;
  author: IAuthor;
  comment: string;
  replies: IReply[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewPayload {
  comment: string;
}

export interface ReplyToReviewPayload {
  comment: string;
  parentReplyId?: string;
}

export interface EditReviewPayload {
  comment: string;
  replyId?: string;
}

export interface DeleteReviewPayload {
  replyId?: string;
}

export interface ReviewsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  reviews: IReview[];
  source?: string;
}