import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpValues } from "@/api/register";
import { useSignUp } from "@/react-query/mutation/auth";
import { SignUpSchema } from "./schema";
import { useTranslation } from "react-i18next";

const signUpFormDefaultValues = {
  email: "",
  password: "",
  username: "",
  full_name: "",
};

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues["payload"]>({
    defaultValues: signUpFormDefaultValues,
    resolver: zodResolver(SignUpSchema),
  });

  const { mutate: handleSignUp } = useSignUp();

  const onSubmit = (values: SignUpValues["payload"]) => {
    handleSignUp(
      { payload: values },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error) => {
          console.error(t("SignUpFailed"), error);
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
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("Username")}
              className="rounded-3xl h-14"
            />
          )}
        />
        {errors.username && (
          <p className="text-red-800 text-sm mt-2">{errors.username.message}</p>
        )}
        <Controller
          control={control}
          name="full_name"
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("FullName")}
              className="rounded-3xl h-14"
            />
          )}
        />
        {errors.full_name && (
          <p className="text-red-800 text-sm mt-2">
            {errors.full_name.message}
          </p>
        )}
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("Email")}
              type="email"
              className="rounded-3xl h-14"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-800 text-sm mt-2">{errors.email.message}</p>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("Password")}
              type="password"
              className="rounded-3xl h-14"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-800 text-sm mt-2">{errors.password.message}</p>
        )}

        <Button type="submit" className="w-full rounded-3xl">
          {t("SignUp")}
        </Button>
        <span className="text-sm flex gap-2">
          <span>{t("HaveAccount")}</span>
          <NavLink
            className="underline text-blue-600 hover:text-blue-800"
            to="/login"
          >
            {t("SignIn")}
          </NavLink>
        </span>
      </form>
    </div>
  );
};

export default Register;
