import { createContext, useContext } from "react";

export const AuthContext = createContext<unknown>(null);

export const useAuthContext = () => {
    return useContext(AuthContext)!;
};