import Cookies from "js-cookie";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import ToastUtils from "../utils/toast";

interface LoginData {
  email: string;
  senha: string;
}

interface RegisterData {
  primeiroNome: string;
  ultimoNome: string;
  email: string;
  senha: string;
}

const login = async ({ email, senha }: LoginData) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, senha);
  const idToken = await userCredential.user.getIdToken();
  const refreshToken = userCredential.user.refreshToken;

  Cookies.set("access", idToken, { expires: 1 });
  Cookies.set("refresh", refreshToken, { expires: 7 });
  Cookies.set("email", userCredential.user.email || "", { expires: 7 });
  return userCredential.user;
};

const register = async ({ primeiroNome, ultimoNome, email, senha }: RegisterData) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
  // Aqui você pode salvar os nomes no seu backend se quiser
  return userCredential.user;
};

const logout = async () => {
  try {
    await signOut(auth);

    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.remove("email");

    ToastUtils.success("Logout realizado com sucesso!");
  } catch (error) {
    ToastUtils.error(`Erro ao deslogar: ${error}`);
  }
};
export const authService = {
  login,
  register,
  logout
};
