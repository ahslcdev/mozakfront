import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import eventoService from "../../services/eventoService";
import ToastUtils from "../../utils/toast";
import EventoForm from "../../components/forms/EventoForm";
import { useAuth } from "../../context/AuthContext";
import type { FormDataEvento } from "../../types/evento";
import { ajustarDatetime } from "../../utils/utils";

const EventoCriar: React.FC = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth()
  const [form, setForm] = useState<FormDataEvento>({
    nome: "",
    descricao: "",
    endereco: "",
    complemento: "",
    cep: "",
    numero: "",
    cidade: "",
    estado: "",
    comeca_as: "",
    termina_as: "",
    max_inscricoes: 0,
    is_ativo: true,
  });
  if (!isAuthenticated){
    navigate('/')
  }
  useEffect(() => {

  })

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: FormDataEvento) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        comeca_as: ajustarDatetime(data.comeca_as),
        termina_as: ajustarDatetime(data.termina_as),
      };
      await eventoService.create(payload);
      ToastUtils.success("Evento criado com sucesso!");
      navigate("/eventos/meus");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return <>
    <EventoForm initialData={form} onSubmit={handleSubmit} isEdit={false} />;
  </>
};

export default EventoCriar;
