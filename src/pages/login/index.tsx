// Import statements remain unchanged
import { login, LoginTypes } from "@/api/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { SignInSchema } from "./schema";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginTypes>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });

  console.log(errors);

  const { mutate: handleLogin } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login successful", data);

      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (data: LoginTypes) => {
    handleLogin(data);
  };

  return (
    <>
      <div className="">
        <NavLink className="bg-slate-400" to="/">
          Back
        </NavLink>
      </div>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold mb-10 text-3xl uppercase">FilmNest</h1>
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-4 w-full max-w-md"
          >
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="email"
                  className="rounded-3xl h-14"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-800 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="password"
                  className="rounded-3xl h-14"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-800 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
            <Button type="submit" className="w-full rounded-3xl">
              Sign In
            </Button>
            <span className="text-sm flex gap-2">
              <span>No account?</span>
              <NavLink
                className="underline text-blue-600 hover:text-blue-800"
                to="/register"
              >
                Sign up!
              </NavLink>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
