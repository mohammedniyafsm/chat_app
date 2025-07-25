import { createContext } from "react";

export interface AuthContextType {
  token: string;
  isLoggedIn: boolean;
  storeTokenInLS: (token: string) => void;
  LogoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
