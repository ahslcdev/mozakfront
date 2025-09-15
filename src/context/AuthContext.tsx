import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authService } from "../services/authService";
import ToastUtils from "../utils/toast";
import { onIdTokenChanged, type User } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import type { DadosLogin } from "../types/registro";


interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  login: (dadosUsuario: DadosLogin) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuthenticated: false,
  loading: true,
  logout: async () => {},
  login: async (_dadosUsuario: DadosLogin) => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get("access");
    setIsAuthenticated(!!token);

    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const idToken = await firebaseUser.getIdToken();
        const refreshToken = firebaseUser.refreshToken;
        const email = firebaseUser.email;

        Cookies.set("access", idToken, { secure: true });
        Cookies.set("refresh", refreshToken, { secure: true });
        if (email) Cookies.set("email", email, { secure: true });
      } else {
        setUser(null);
        Cookies.remove("idToken");
        Cookies.remove("refreshToken");
        Cookies.remove("email");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (dadosUsuario: DadosLogin) => {
    try {
      await authService.login(dadosUsuario);
      setIsAuthenticated(true);
      ToastUtils.success("Login efetuado com sucesso!")
    } catch (error) {
      ToastUtils.error("Credenciais inválidas.")
    } 
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setIsAuthenticated(false);
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
