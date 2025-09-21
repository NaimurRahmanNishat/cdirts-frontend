/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "./authApi";

type AuthState = {
  user: TUser | null;
};

const loadUserFromLocalStorage = (): AuthState => {
  try {
    const stored = localStorage.getItem("user");
    if (!stored) return { user: null };
    const parsed = JSON.parse(stored) as TUser;
    return { user: parsed || null };
  } catch (error: any) {
    return { user: null };
  }
};

// sanitize user object by removing sensitive fields
const sanitizeUser = (user: Partial<TUser> | null): TUser | null => {
  if (!user) return null;

  const cloned: any = { ...user };
  const forbiddenRegex = /(password|pass|token|refresh|otp|secret|nid)/i;

  Object.keys(cloned).forEach((key) => {
    if (forbiddenRegex.test(key)) {
      delete cloned[key];
    }
  });
  return cloned as TUser;
};

const initialState: AuthState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // set user and sanitize sensitive fields
    setUser: (state, action: PayloadAction<{ user: Partial<TUser> | null }>) => {
      const sanitized = sanitizeUser(action.payload.user ?? null);
      state.user = sanitized;
      if (sanitized) {
        localStorage.setItem("user", JSON.stringify(sanitized));
      } else {
        localStorage.removeItem("user");
      }
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    // optional: clear local storage without changing redux state
    clearLocalUser: () => {
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout, clearLocalUser } = authSlice.actions;
export default authSlice.reducer;
