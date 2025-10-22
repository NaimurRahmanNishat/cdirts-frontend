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