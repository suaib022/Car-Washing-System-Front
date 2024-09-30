import { jwtDecode } from "jwt-decode";

export type TUser = {
  userEmail: string;
  role: string;
  iat: number;
  exp: number;
} | null;

export const verifyToken = (token: string) => {
  return jwtDecode(token as string) as TUser;
};
