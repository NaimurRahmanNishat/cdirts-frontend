/* eslint-disable @typescript-eslint/no-explicit-any */
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type ResetInputs = {
  otp: string;
  newPassword: string;
};

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  console.log(resetPassword);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetInputs>();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (data: ResetInputs) => {
    try {
      await resetPassword(data as any).unwrap();
      setMessage("Password reset successful!");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      console.error("Reset Error:", err);
      setError(err?.data?.message || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-md mx-auto p-4 bg-white border-2 border-green-600 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border p-2 rounded mb-2"
            {...register("otp", { required: "OTP is required" })}
          />
          {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}

          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border p-2 rounded mb-2"
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
          />
          {errors.newPassword && (
            <p className="text-red-500">{errors.newPassword.message}</p>
          )}

          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded mt-2"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
