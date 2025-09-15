import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

const formatarDataHora = (datetime: string) => {
    const date = new Date(datetime);
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
};

const ajustarDatetime = (value: string) => {
    const date = new Date(value);
    return date.toISOString();
};

const converterDatetime = (datetime: string) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export {
    formatarDataHora,
    ajustarDatetime,
    converterDatetime
}

