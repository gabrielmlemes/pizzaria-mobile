import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  loadingAuth: boolean
  loading: boolean
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => Promise<void>;
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
  const isAuthenticated = !!user.name;
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true)

  // Loga o usuário
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

  async function signOut() {
    setLoading(true)

    await AsyncStorage.clear()
    .then(()=> {
      setUser({
        id: "",
        name: "",
        email: "",
        token: "",
      })
    })

    setLoading(false)
  }

  // Permance logado
  useEffect(()=>{
    async function getUser() {
      // pega os dados salvos do user
      const userInfo = await AsyncStorage.getItem('@thepizza')
      const hasUser:UserProps = JSON.parse(userInfo || '{}')

      // verifica se recebemos as informações do user
      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common["Authorization"] = `Bearer ${hasUser.token}`

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
        })
      }

      setLoading(false)
    }

    getUser()
  }, [])

  

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, loadingAuth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
