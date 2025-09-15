import api from "./api";

export interface Evento {
  id: number;
  uuid_code: string | null
  nome: string;
  comeca_as: string;
  endereco_evento: string;
  termina_as: string;
  descricao?: string;
}

export interface EventoPayload {
  nome: string;
  descricao?: string;
  endereco: string;
  complemento: string;
  cep: string;
  numero: string;
  cidade: string;
  estado: string;
  comeca_as: string;
  termina_as: string;
  max_inscricoes: number;
  is_ativo: boolean;
}

const eventoService = {
  getAllByMe: async (params: Record<string, string | number> = {}): Promise<Evento[]> => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    const endpoint = queryString ? `/admin/eventos/?${queryString}` : "/admin/eventos/";
    return await api.request(endpoint, { method: "GET" });
  },
  getAll: async (params: Record<string, string | number> = {}): Promise<Evento[]> => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    const endpoint = queryString ? `/eventos/?${queryString}` : "/eventos/";
    return await api.request(endpoint, { method: "GET" });
  },

  getById: async (id: string): Promise<Evento> => {
    return await api.request(`/eventos/${id}/`, { method: "GET" });
  },

  create: async (payload: EventoPayload): Promise<Evento> => {
    return await api.request("/admin/eventos/", {
      method: "POST",
      body: payload,
    });
  },

  update: async (id: string, payload: EventoPayload): Promise<Evento> => {
    return await api.request(`/admin/eventos/${id}/`, {
      method: "PATCH",
      body: payload,
    });
  },

  remove: async (id: string): Promise<void> => {
    return await api.request(`/admin/eventos/${id}/`, {
      method: "DELETE",
    });
  },
  inscrever: async (id: string | number): Promise<any> => {
    return await api.request(`/eventos/${id}/inscrever/`, { method: "POST" });
  },
  cancelarInscricao: async (id: string | number): Promise<any> => {
    return await api.request(`/eventos/${id}/cancelar-inscricao/`, { method: "PATCH" });
  },
};

export default eventoService;
