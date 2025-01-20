import { userAtom } from "@/api";
import { useAtom } from "jotai";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RouteGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const [user] = useAtom(userAtom);

  if (user) {
    return <Navigate to="/" />;
  }
  return children || <Outlet />;
};

export const ProfileGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const [user] = useAtom(userAtom);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children || <Outlet />;
};
