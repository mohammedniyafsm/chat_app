import { Button } from "../componenst/ui/Button";
import { InputWithLabel } from "../componenst/ui/LabelInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "../hooks/user";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof signupSchema>;

export const Signup = () => {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  const Signuphandle = (data: FormData) => {
    signup(data, {
      onSuccess: () => {
        toast.success("Signed in successfully");
        navigate("/signin"); // Optional redirect
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(axiosError.response?.data?.message || "Signin failed");
      },
    });
  };

  return (
    <div className="flex items-center justify-center bg-gray-300/50 h-screen w-screen">
      <div className="bg-white sm:min-h-[520px] sm:w-[360px] w-64 rounded-lg border border-gray-200 shadow-md">
        {/* Header */}
        <div className="flex flex-col items-center py-6">
          <h1 className="font-bold sm:text-3xl text-xl font-inter">Sign Up</h1>
          <div className="text-xs sm:text-base text-gray-300 font-inter text-center mt-2">
            Enter Your Credential to access your <br /> account
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(Signuphandle)}>
          <div className="px-6">
            <InputWithLabel
              type="text"
              heading="Username"
              {...register("username")}
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}

            <InputWithLabel
              type="text"
              heading="Email"
              {...register("email")}
              placeholder="youremail@gmail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}

            <InputWithLabel
              type="password"
              heading="Password"
              {...register("password")}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center items-center px-4 mt-2">
            <Button
              variant="primary"
              text={isLoading ? "Signing in..." : "Signin"}
              size="lg"
            />
          </div>
        </form>

        {/* Navigation to Signup */}
        <div className="flex justify-center mb-4 py-2">
          <h1 className="font-medium font-inter sm:text-sm text-xs">
            Don't have an account?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Signup
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};
