import { Button } from "../componenst/ui/Button";
import { InputWithLabel } from "../componenst/ui/LabelInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignin } from "../hooks/user";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";


const signinSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof signinSchema>;

export const Signin = () => {
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const { mutate: signin, isLoading } = useSignin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signinSchema),
  });

  const signinHandle = (data: FormData) => {
    signin(data, {
      onSuccess: (response) => {
        storeTokenInLS(response.data.token)
        toast.success("Successfully Signed In");
        navigate("/");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(axiosError.response?.data?.message || "Signin failed");
      },
    });
  };

  return (
    <div className="flex items-center justify-center bg-gray-300/50 h-screen w-screen">
      <div className="bg-white sm:min-h-[440px] sm:w-[360px] h-92 w-64 rounded-lg border border-gray-200 shadow-md">
        <div className="flex flex-col items-center py-6">
          <h1 className="font-bold sm:text-3xl text-xl font-inter">Sign In</h1>
          <div className="flex items-center text-xs sm:text-base text-gray-300 font-inter text-center mt-2">
            Enter Your Credential to access your <br /> account
          </div>
        </div>

        <form onSubmit={handleSubmit(signinHandle)}>
          <div className="px-6">
            <InputWithLabel
              type="text"
              heading="Email"
              placeholder="youremail@gmail.com"
              disabled={isLoading}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}

            <InputWithLabel
              type="password"
              heading="Password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-center items-center px-4 mt-2">
            <Button
              variant="primary"
              text={isLoading ? "Signing in..." : "Signin"}
              size="lg"
            />
          </div>
        </form>

        <div className="flex justify-center mb-4 py-2">
          <h1 className="font-medium font-inter sm:text-sm text-xs">
            Don't have an account?{" "}
            <span className="underline cursor-pointer" onClick={() => navigate("/signup")}>
              Signup
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};
