import React, { useEffect, useState } from "react";
import eventoService, { type Evento } from "../services/eventoService";
import FiltrosEventos from "../components/forms/FiltroForm";
import EventosList from "../components/Eventos";

const Home: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 30;

  const carregarEventos = async (page = 1) => {
    try {
      setLoading(true);

      const params: Record<string, string | number> = {
        page,
        page_size: pageSize,
      };

      if (search) params.search = search;
      if (dataInicio) params.data_inicio = dataInicio;
      if (dataFim) params.data_fim = dataFim;

      const data = await eventoService.getAll(params);

      setEventos(data.results);
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (error) {
      console.error("Erro ao carregar eventos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEventos(currentPage);
  }, [currentPage]);

  const handleFiltrar = async () => {
    setCurrentPage(1);
    await carregarEventos(1);
  };
  const handleLimpar = () => {
    setSearch("");
    setDataInicio("");
    setDataFim("");
    setCurrentPage(1);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Eventos da morena.</h2>
      <FiltrosEventos
        search={search}
        dataInicio={dataInicio}
        dataFim={dataFim}
        showStatusFilter={false}
        onSearchChange={setSearch}
        onDataInicioChange={setDataInicio}
        onDataFimChange={setDataFim}
        onFiltrar={handleFiltrar}
        onLimpar={handleLimpar}
      />

      <EventosList
        eventos={eventos}
        loading={loading}
        enableActions={false}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
