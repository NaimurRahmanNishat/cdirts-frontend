/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Lock, User, Phone, IdCard, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// --- Zod Schema ---
const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password required"),
    phone: z.string().min(11, "Phone number too short"),
    nid: z.string().min(10, "NID too short"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

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

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register: hookRegister, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  // --- Form Submission ---

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        nid: data.nid
      }).unwrap();

      if (res.success && res.token) {
        localStorage.setItem("activationToken", res.token);
        toast.success(res.message || "Registration successful! Check your email for OTP.");
        navigate("/register-otp");
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <div className="bg-white border p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Full Name" {...hookRegister("name")} icon={<User size={18} />} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            <Input placeholder="Email" type="email" {...hookRegister("email")} icon={<Mail size={18} />} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <div className="relative">
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...hookRegister("password")}
                icon={<Lock size={18} />}
              />
              <div className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="relative">
              <Input
                placeholder="Confirm Password"
                type={showConfirm ? "text" : "password"}
                {...hookRegister("confirmPassword")}
                icon={<Lock size={18} />}
              />
              <div className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <Input placeholder="Phone Number" {...hookRegister("phone")} icon={<Phone size={18} />} />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

            <Input placeholder="NID Number" {...hookRegister("nid")} icon={<IdCard size={18} />} />
            {errors.nid && <p className="text-red-500 text-sm">{errors.nid.message}</p>}

            <Button type="submit" className="w-full cursor-pointer flex justify-center" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "Register"}
            </Button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
