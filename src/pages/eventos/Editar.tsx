import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import eventoService from "../../services/eventoService";
import ToastUtils from "../../utils/toast";
import EventoForm from "../../components/forms/EventoForm";
import type { FormDataEvento } from "../../types/evento";


const EditarEvento: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<FormDataEvento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!id) return;

  const fetchEvento = async () => {
    try {
      const data = await eventoService.getById(id);
      if (!data) {
        ToastUtils.error("Evento não encontrado");
        navigate("/");
        return;
      }
      setInitialData(data);
    } catch (err) {
      ToastUtils.error("Erro ao buscar evento");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  fetchEvento();
}, [id]);

  const handleUpdate = async (data: FormDataEvento) => {
    await eventoService.update(id!, data);
    ToastUtils.success("Evento atualizado com sucesso");
    navigate("/eventos/meus");
  };
  console.log(initialData)
  if (loading) return <p>Carregando...</p>;
  if (!initialData) return null;

  return <EventoForm initialData={initialData} onSubmit={handleUpdate} isEdit={true} />;
};

export default EditarEvento