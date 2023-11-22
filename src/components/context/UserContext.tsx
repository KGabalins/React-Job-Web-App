import { createContext } from "react";

export type TUser = {
  name: string;
  token: string;
};

type TUserContext = {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

export const UserContext = createContext({} as TUserContext);
