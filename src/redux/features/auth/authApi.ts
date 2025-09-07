import { getBaseUrl } from "@/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type userRole = "user" | "admin";

export interface TUser {
    _id: string;
    username: string;
    email: string;
    password?: string;
    otpCode?: string;
    otpExpire?: Date;
    otpRequestedAt?: Date;
    isVerified?: boolean;
    passwordResetToken?: string;
    passwordResetExpire?: Date;
    passwordChangedAt?: Date;
    role?: userRole;
    phone?: string;
    nidcard?: string;
}

// user response type
export interface userResponse {
    success: string;
    message: string;
    user: TUser;
}

// register type
export interface userRegisterResponse{
    username: string;
    email: string;
    password: string;
    phone: number;
    nidcard: number;
}

// register otp type
export interface registerOtp{
    email: string;
    otpCode: string;
}

// login type
export interface userLogin{
    email: string;
    password: string;
}

// login & resend otp type
export interface loginOtp{
    email: string;
}

// forgot password type
export interface forgotPassword{
    email: string;
}

// reset passord type
export interface resetPassword{
    email: string;
    otpCode: string;
    newPassword: string;
}

export const authApi = createApi ({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`,
        credentials: "include"
    }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        // register
        register: builder.mutation<userResponse, userRegisterResponse>({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ["Auth"]
        }),
        // verify register otp
        verifyRegisterOtp: builder.mutation<userResponse, registerOtp>({
            query: (otp) =>({
                url: '/verify-register-otp', 
                method: 'POST',
                body: otp
            }),
            invalidatesTags: ["Auth"],
        }),
        // login (step one send otp)
        login: builder.mutation<userResponse, userLogin>({
            query: (data) =>({
                url: '/login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Auth"],
        }),
        // verify otp ( return token + user )
        verifyLoginOtp: builder.mutation<userResponse, loginOtp>({
            query: (data) =>({
                url: '/verify-login-otp',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Auth"],
        }),
        // resend login otp
        resendLoginOtp: builder.mutation<userResponse, loginOtp>({
            query: (data) => ({
                url: '/resend-login-otp',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        // forgot password
        forgotPassword: builder.mutation<userResponse, forgotPassword>({
            query: (data) =>({
                url: '/forgot-password',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        // reset password
        resetPassword: builder.mutation<userResponse, resetPassword>({
            query: (data) =>({
                url: '/reset-password',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Auth"],
        }),
        // logout
        logout: builder.mutation<userResponse, void>({
            query: () =>({
                url: '/logout',
                method: 'POST',
            }),
            invalidatesTags: ["Auth"],
        }),
    })
});

export const { useRegisterMutation, useVerifyRegisterOtpMutation, useLoginMutation, useVerifyLoginOtpMutation, useResendLoginOtpMutation, useForgotPasswordMutation, useLogoutMutation } = authApi;