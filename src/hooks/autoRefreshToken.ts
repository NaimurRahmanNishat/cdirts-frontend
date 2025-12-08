// src/hooks/useAutoRefreshToken.ts

import { useRefreshTokenMutation } from "@/redux/features/auth/authApi";
import type { RootState } from "@/redux/store";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const useAutoRefreshToken = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [refreshToken] = useRefreshTokenMutation();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      console.log("✅ User authenticated, setting up token refresh");

      // Immediate refresh
      refreshToken({ userId: user._id })
        .unwrap()
        .then(() => console.log("✅ Token refreshed successfully"))
        .catch((error) => console.error("Token refresh failed:", error));

      // Set interval to refresh token (1 minute)
      intervalRef.current = setInterval(() => {
        console.log("🔄 Refreshing token...");
        refreshToken({ userId: user._id })
          .unwrap()
          .then(() => console.log("✅ Token refreshed"))
          .catch((error) => console.error("Token refresh error:", error));
      }, 1 * 60 * 1000);

      // Cleanup when user logs out or unmounts
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          console.log("🧹 Token refresh interval cleared");
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("🔴 User logged out, token refresh stopped");
      }
    }
  }, [isAuthenticated, user?._id, refreshToken]);
};
