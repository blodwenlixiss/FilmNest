import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpValues } from "@/api/register";
import { useSignUp } from "@/react-query/mutation/auth";
import { SignUpSchema } from "./schema";

const signUpFormDefaultValues = {
  email: "",
  password: "",
  username: "",
  full_name: "",
};

const Register = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues["payload"]>({
    defaultValues: signUpFormDefaultValues,
    resolver: zodResolver(SignUpSchema), // Make sure `SignUpSchema` validates all fields
  });

  const { mutate: handleSignUp } = useSignUp();

  const onSubmit = (values: SignUpValues["payload"]) => {
    handleSignUp(
      { payload: values },
      {
        onSuccess: (data) => {
          console.log("Account created:", data);
          navigate("/"); // Redirect after successful signup
        },
        onError: (error) => {
          console.error("Signup failed:", error);
          alert("Signup failed: " + error.message);
        },
      }
    );
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold mb-10 text-3xl uppercase">FilmNest</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 w-full max-w-md"
      >
        {/** Username */}
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Username"
              className="rounded-3xl h-14"
            />
          )}
        />
        {errors.username && (
          <p className="text-red-800 text-sm mt-2">{errors.username.message}</p>
        )}

        {/** Full Name */}
        <Controller
          control={control}
          name="full_name"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Full Name"
              className="rounded-3xl h-14"
            />
          )}
        />
        {errors.full_name && (
          <p className="text-red-800 text-sm mt-2">
            {errors.full_name.message}
          </p>
        )}

        {/** Email */}
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Email"
              type="email"
              className="rounded-3xl h-14"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-800 text-sm mt-2">{errors.email.message}</p>
        )}

        {/** Password */}
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Password"
              type="password"
              className="rounded-3xl h-14"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-800 text-sm mt-2">{errors.password.message}</p>
        )}

        <Button type="submit" className="w-full rounded-3xl">
          Sign Up
        </Button>
        <span className="text-sm flex gap-2">
          <span>Have an account?</span>
          <NavLink
            className="underline text-blue-600 hover:text-blue-800"
            to="/login"
          >
            Sign In!
          </NavLink>
        </span>
      </form>
    </div>
  );
};

export default Register;
