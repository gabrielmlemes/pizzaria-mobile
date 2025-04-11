import React, { createContext, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  isAuthenticated: boolean;
  user: UserProps;
  signIn: (credentials: SignInProps) => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface SignInProps {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    token: "",
  });

  const [loadingAuth, setLoadingAuth] = useState(false);

  const isAuthenticated = !!user.name;

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const res = await api.post("/session", {
        email,
        password,
      });
      // console.log(res.data);

      const { id, name, token } = res.data;

      const data = {
        ...res.data,
      };

      await AsyncStorage.setItem("@thepizza", JSON.stringify(data)); // persiste os dados do usuário de forma offline para não precisar fazer o login toda vez

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // informa pra sempre passar pra qualquer rota, o token do usuário

      setUser({
        id,
        name,
        email,
        token,
      });

      setLoadingAuth(false);
    } catch (error) {
      console.log("erro ao acessar", error);
      setLoadingAuth(false);
    }

    setLoadingAuth(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
