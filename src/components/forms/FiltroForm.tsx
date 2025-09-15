import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { FaEraser, FaSearch } from "react-icons/fa";

interface FiltrosEventosProps {
  search: string;
  dataInicio: string;
  dataFim: string;
  isAtivo?: "todos" | "ativo" | "inativo";
  showStatusFilter?: boolean;
  onSearchChange: (value: string) => void;
  onDataInicioChange: (value: string) => void;
  onDataFimChange: (value: string) => void;
  onIsAtivoChange?: (value: "todos" | "ativo" | "inativo") => void;
  onFiltrar: () => void;
  onLimpar: () => void;
}

const FiltrosEventos: React.FC<FiltrosEventosProps> = ({
  search,
  dataInicio,
  dataFim,
  isAtivo = "todos",
  showStatusFilter = false,
  onSearchChange,
  onDataInicioChange,
  onDataFimChange,
  onIsAtivoChange,
  onFiltrar,
  onLimpar,
}) => {
  return (
    <Form className="card mb-4 shadow-sm p-3">
      <h5 className="mb-3">Filtros</h5>
      <Row className="g-3 align-items-end">
        <Col md={showStatusFilter ? 3 : 4}>
          <Form.Group controlId="search">
            <Form.Label>Busca</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar por nome, descrição, cidade, endereço..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={showStatusFilter ? 3 : 4}>
          <Form.Group controlId="dataInicio">
            <Form.Label>Data de Início</Form.Label>
            <Form.Control
              type="date"
              value={dataInicio}
              onChange={(e) => onDataInicioChange(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={showStatusFilter ? 3 : 4}>
          <Form.Group controlId="dataFim">
            <Form.Label>Data de Fim</Form.Label>
            <Form.Control
              type="date"
              value={dataFim}
              onChange={(e) => onDataFimChange(e.target.value)}
            />
          </Form.Group>
        </Col>

        {showStatusFilter && onIsAtivoChange && (
          <Col md={3}>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={isAtivo}
                onChange={(e) =>
                  onIsAtivoChange(e.target.value as "todos" | "ativo" | "inativo")
                }
              >
                <option value="todos">Todos</option>
                <option value="ativo">Ativos</option>
                <option value="inativo">Inativos</option>
              </Form.Select>
            </Form.Group>
          </Col>
        )}

      </Row>
      <div className="d-flex justify-content-end mt-3 gap-2">
        <Button
            variant="primary"
            size="sm"
            onClick={onFiltrar}
            style={{ width: "90px" }}
        >
            <FaSearch className="me-1 align-middle" style={{ fontSize: "1em" }} />
            <span className="align-middle">Filtrar</span>
        </Button>
        <Button
            variant="secondary"
            size="sm"
            onClick={onLimpar}
            style={{ width: "90px" }}
        >
            <FaEraser className="me-1 align-middle"  style={{ fontSize: "1em" }}  />
            <span className="align-middle">Limpar</span>
        </Button>
      </div>
    </Form>
  );
};

export default FiltrosEventos;
