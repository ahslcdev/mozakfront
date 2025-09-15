export interface FormDataEvento {
  nome: string;
  descricao: string;
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

export interface EventoList {
  id: number;
  nome: string;
  endereco_evento: string;
  comeca_as: string;
  is_ativo: boolean;
  is_inscrito: boolean
  uuid_code: string
}

export interface MeusEventosList {
  id: number;
  nome: string;
  comeca_as: string;
  endereco_evento: string;
  is_ativo: boolean;
}