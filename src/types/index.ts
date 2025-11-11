
// ================================= API issue types ==================================

export interface IssueImage {
  public_id: string;
  url: string;
}

export interface IAuthor {
  _id: string;
  name: string;
  email: string;
}

export interface Review {
  _id: string;
  author: IAuthor | string;
  comment: string;
  replies?: Review[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Issue {
  _id: string;
  title: string;
  category: string;
  description: string;
  images: IssueImage[];
  location: string;
  division: string;
  status: string;
  author: IAuthor | string;
  approvedBy?: IAuthor | string; 
  approvedAt?: string; 
  reviews?: Review[];
  date: Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApproveIssueResponse {
  success: boolean;
  message: string;
  issue: Issue;
}

export interface CreateIssuePayload {
  title: string;
  category: string;
  description: string;
  images: IssueImage[];
  location: string;
  division: string;
  date: Date;
}

export interface CreateIssueResponse {
  success: boolean;
  message: string;
  issue: Issue;
}

export type GetAllIssuesArgs = {
  page?: number;
  limit?: number;
  sort?: string;
  status?: string;
  division?: string;
  category?: string;
  search?: string;
};

export interface PaginatedIssuesResponse {
  success: boolean;
  message: string;
  issues: Issue[];
  totalIssues: number;
  totalPages: number;
}

export interface IssueByIdResponse {
  success: boolean;
  message: string;
  issue: Issue;
}

export interface EditIssuePayload {
  title: string;
  category: string;
  description: string;
  images: IssueImage[];
  location: string;
  division: string;
  date: Date;
}

export interface EditIssueResponse {
  success: boolean;
  message: string;
  issue: Issue;
}


// ================================= API Review Reply type =================================
export interface IUserRef {
  _id: string;
  name: string;
  avatar?: string;
}

export interface IReply {
  author: IUserRef;
  comment: string;
  createdAt?: string;
}

export interface IReview {
  _id: string;
  issue: string;
  author: IUserRef;
  comment: string;
  createdAt: string;
  replies: IReply[];
}