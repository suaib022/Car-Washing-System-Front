import { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { getCurrentToken } from "../../redux/features/auth/authSlice";

type TNonUserRoute = {
  children: ReactNode;
};

const NonUserRoute = ({ children }: TNonUserRoute) => {
  const token = useAppSelector(getCurrentToken);

  if (token) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default NonUserRoute;
