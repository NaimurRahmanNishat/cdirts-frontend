/* eslint-disable @typescript-eslint/no-explicit-any */

import { type JSX } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActivateUserMutation } from "@/redux/features/auth/authApi";
import { Button } from "@/components/ui/button";
import { Loader2, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// --- Zod Schema ---
const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

type OTPFormValues = z.infer<typeof otpSchema>;

// --- Input Component ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
}
const Input = ({ icon, ...props }: InputProps) => (
  <div className="relative">
    <input
      {...props}
      className="w-full border rounded-lg p-2 pl-10 outline-none focus:ring-2 focus:ring-blue-400"
    />
    {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
  </div>
);

const ActivateUser =() => {
  const navigate = useNavigate();
  const [activateUser, { isLoading }] = useActivateUserMutation();
  const [token] = useState(() => localStorage.getItem("activationToken") || "");

  const { register, handleSubmit, formState: { errors } } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OTPFormValues) => {
    if (!token) {
      toast.error("Activation token missing. Please register again.");
      return;
    }

    try {
      const res = await activateUser({ token, activationCode: data.otp }).unwrap();
      if (res.success) {
        toast.success("User registered successfully!");
        localStorage.removeItem("activationToken");
        navigate("/login"); 
      } else {
        toast.error(res.message || "Activation failed");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Activation failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Activate Your Account</h2>
        <p className="text-center text-gray-600 mb-4">
          Enter the OTP sent to your email to activate your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Enter OTP"
            {...register("otp")}
            icon={<Key size={18} />}
          />
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}

          <Button type="submit" className="w-full flex justify-center" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "Verify OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ActivateUser;
