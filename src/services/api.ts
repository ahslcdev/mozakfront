import ToastUtils from "../utils/toast";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL as string;

interface RequestOptions<T = any> {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: T;
  auth?: boolean;
}

interface ApiError {
  errors?: {
    detalhes?: { message: string }[];
  };
  detail?: Array<string>;
  msg?: string;
  [key: string]: any;
}

async function request<TResponse = any, TBody = any>(
  endpoint: string,
  { method = "GET", body, auth = true }: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = Cookies.get("access");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/api${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: ApiError | TResponse;
  try {
    data = await res.json();
  } catch {
    data = {} as ApiError;
  }

  if (!res.ok) {
    const errorData = data as ApiError;
    if (res.status === 400){
        if (errorData.detail?.length){
            errorData.detail.forEach(element => {
                ToastUtils.error(element);
            });
        }else{
            ToastUtils.error("Ocorreu um erro, entre em contato com o suporte");
        }
    } else if (res.status === 401) {
      ToastUtils.error("Não autorizado");
    } else if (res.status === 403) {
      ToastUtils.error("Você não tem permissão");
    } else if (errorData.detail) {
      ToastUtils.error(errorData.detail);
    } else {
      ToastUtils.error("Erro desconhecido");
    }

    throw new Error("Erro na requisição");
  }

  if ((data as ApiError).msg) {
    ToastUtils.success((data as ApiError).msg!);
  }

  return data as TResponse;
}

export default { request };
