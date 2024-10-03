export const USER_ROLE = {
  admin: "admin",
  user: "user",
};

export type TUserRole = keyof typeof USER_ROLE;

export const Role: TUserRole[] = ["admin", "user"];

export type TUser = {
  name: string;
  email: string;
  password: string;
  image: string;
  phone: string;
  role: TUserRole;
  address: string;
};
