import { login, LoginTypes } from "@/api/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { SignInSchema } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
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

  const { mutate: handleLogin } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error(t("LoginFailed"), error);
    },
  });

  const onSubmit = (data: LoginTypes) => {
    handleLogin(data);
  };

  return (
    <>
      <div>
        <NavLink className="bg-slate-400" to="/">
          {t("Back")}
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
                  placeholder={t("Email")}
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
                  placeholder={t("Password")}
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
              {t("SignIn")}
            </Button>
            <span className="text-sm flex gap-2">
              <span>{t("NoAccount")}</span>
              <NavLink
                className="underline text-blue-600 hover:text-blue-800"
                to="/register"
              >
                {t("SignUp")}
              </NavLink>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
