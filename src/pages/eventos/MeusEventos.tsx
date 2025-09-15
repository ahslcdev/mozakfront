import React, { useEffect, useState } from "react";
import ToastUtils from "../../utils/toast";
import eventoService from "../../services/eventoService";
import { useNavigate } from "react-router-dom";
import FiltrosEventos from "../../components/forms/FiltroForm";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import EventosList from "../../components/Eventos";
import { useAuth } from "../../context/AuthContext";
import type { MeusEventosList } from "../../types/evento";

const MeusEventos: React.FC = () => {
  const [eventos, setEventos] = useState<MeusEventosList[]>([]);
  const [loading, setLoading] = useState(true);
  const {isAuthenticated} = useAuth();

  const [search, setSearch] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [isAtivo, setIsAtivo] = useState<string>("todos");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate()
  const pageSize = 30;

  if (!isAuthenticated){
    navigate('/')
  }

  const fetchEventos = async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = {
        page: currentPage,
        page_size: pageSize,
      };
      if (search) params.nome = search;
      if (dataInicio) params.comeca_as__gte = dataInicio;
      if (dataFim) params.comeca_as__lte = dataFim;
      if (isAtivo === "ativo") params.is_ativo = true;
      else if (isAtivo === "inativo") params.is_ativo = false;

      const data = await eventoService.getAllByMe(params);
      setEventos(data.results);
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (err) {
      console.error(err);
      ToastUtils.error("Erro ao buscar eventos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, [currentPage]);

  const handleFiltrar = () => {
    setCurrentPage(1);
    fetchEventos();
  };

  const handleLimpar = () => {
    setSearch("");
    setDataInicio("");
    setDataFim("");
    setIsAtivo("todos");
    setCurrentPage(1);
    fetchEventos();
  };

  const handleDeleteClick = async (id: string) => {
    await eventoService.remove(id)
    ToastUtils.success("Evento deletado com sucesso!")
    fetchEventos()
  };

  return (
    <div className="container">
      <h2 className="mb-4 text-center">Meus Eventos</h2>

      <FiltrosEventos
        search={search}
        dataInicio={dataInicio}
        dataFim={dataFim}
        isAtivo={isAtivo} 
        showStatusFilter={true}
        onSearchChange={setSearch}
        onDataInicioChange={setDataInicio}
        onDataFimChange={setDataFim}
        onIsAtivoChange={setIsAtivo}
        onFiltrar={handleFiltrar}
        onLimpar={handleLimpar}
      />
      <div className="mb-2 d-flex justify-content-end">
        <Button onClick={() => navigate('/eventos/novo')}>
          <FaPlus className="me-1 align-middle" style={{ fontSize: "1em" }} /> 
          <span className="align-middle">Adicionar Evento</span>
          </Button>
      </div>
       
      <EventosList
        eventos={eventos}
        loading={loading}
        enableActions={true}
        onDelete={handleDeleteClick}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MeusEventos;
