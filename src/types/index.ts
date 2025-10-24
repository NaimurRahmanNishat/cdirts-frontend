
// User Types 
export type Role = "admin" | "user";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  role: Role;
  avatar?: {
    public_id: string;
    url: string;
  };
  phone?: string;
  nid?: string;
  passwordResetToken?: string;
  passwordResetExpire?: Date;
  createdAt: string;
  updatedAt: string;
}

// API Response Types 
export interface RegisterResponse {
  success: boolean;
  message: string;
  token: string;
}

export interface ActivateUserResponse {
  success: boolean;
  message: string;
  newUser: TUser;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: TUser;  
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: TUser;
}

export interface SocialAuthResponse {
  success: boolean;
  message: string;
  data: TUser; 
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user: TUser;  
}

// Payload Types 
export interface UserRegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  nid: string;
}

export interface ActivateUserPayload {
  token: string;
  activationCode: string;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface SocialAuthPayload {
  email: string;
  name: string;
  avatar?: {
    public_id: string;
    url: string;
  };
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  otp: string;
  newPassword: string;
}

export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
}


// issue types 
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
  reviews?: Review[];
  date: Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateIssuePayload {
  title: string;
  category: string;
  description: string;
  images: IssueImage[];
  location: string;
  division: string;
  author?: string; 
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
  total: number;
  pagination: { page: number; limit: number; pages: number };
  issues: Issue[];
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
