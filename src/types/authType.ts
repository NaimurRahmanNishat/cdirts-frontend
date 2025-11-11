export type Role = "user" | "category-admin" | "super-admin";
export type CategoryType ="broken-road" | "water" | "gas" | "electricity" | "other";
export type DivisionType = "Dhaka" | "Chattogram" | "Rajshahi" | "Khulna" | "Barishal" | "Sylhet" | "Rangpur" | "Mymensingh";


export interface TAuthUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  nid?: string;
  isVerified: boolean;
  role?: Role;
  category?: CategoryType;
  avatar?: {
    public_id: string;
    url: string;
  };
  resetPasswordOtp?: string;
  resetPasswordOtpExpiry?: Date;
  division?: DivisionType;
  createdAt?: string;
  updatedAt?: string;
}


// ================================= API Response Types & Payload ==================================

// 1. register api
export interface RegisterResponse {
  success: boolean;
  message: string;
  token: string;
}

export interface UserRegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  nid: string;
  category?: CategoryType;
}


// 2. activate api
export interface ActivateUserResponse {
  success: boolean;
  message: string;
  newUser: TAuthUser;
}

export interface ActivateUserPayload {
  token: string;
  activationCode: string;
}


// 3. login api
export interface LoginResponse {
  success: boolean;
  message: string;
  data: TAuthUser;  
}

export interface UserLoginPayload {
  email: string;
  password: string;
}


// 4. refresh token
export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: TAuthUser;
}


// 5. social auth
export interface SocialAuthResponse {
  success: boolean;
  message: string;
  data: TAuthUser; 
}

export interface SocialAuthPayload {
  email: string;
  name: string;
  avatar?: {
    public_id: string;
    url: string;
  };
}


// 6. forgot password
export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordPayload {
  email: string;
}


// 7. reset password
export interface ResetPasswordPayload {
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}


// 8. logout
export interface LogoutResponse {
  success: boolean;
  message: string;
}


// 9. update user profile
export interface UpdateUserProfileResponse {
  success: boolean;
  message: string;
  user: TAuthUser;  
}

export interface UpdateUserProfilePayload {
  name?: string;
  phone?: string;
}


// 10. Get all user
export interface GetAllUsersResponse {
  success: boolean;
  message: string;
  data:{
    count: number;
    users: TAuthUser[];
  }
}


// 11. get all category admins
export interface GetAllCategoryAdminsResponse {
  success: boolean;
  fromCache?: boolean;
  count?: number;
  data: TAuthUser[];
}


// 12. update category admin
export interface UpdateCategoryAdminResponse {
  success: boolean;
  message: string;
  categoryAdmin: TAuthUser;
}

export interface UpdateCategoryAdminPayload {
  _id: string;
  category: CategoryType;
  division: DivisionType;
}


// 13. delete response
export interface DeleteCategoryAdminResponse {
  success: boolean;
  message: string;
}
