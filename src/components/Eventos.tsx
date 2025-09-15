import { useState } from "react";
import { Button, Modal, Spinner, Alert, Row, Col, Card } from "react-bootstrap";
import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Pagination from "./Paginacao";
import { formatarDataHora } from "../utils/utils";
import { FaCheck } from "react-icons/fa";
import type { EventoList } from "../types/evento";

interface EventosListProps {
  eventos: EventoList[];
  loading?: boolean;
  enableActions?: boolean;
  onDelete?: (id: number) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const EventosList: React.FC<EventosListProps> = ({
  eventos,
  loading = false,
  enableActions = false,
  onDelete = () => {},
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      onDelete(selectedId);
    }
    setShowModal(false);
  };

  return (
    <>
      {loading ? (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <Spinner animation="border" role="status" className="mb-3" />
          <p className="text-muted">Carregando eventos...</p>
        </div>
      ) : eventos.length === 0 ? (
        <Alert
          variant="info"
          className="d-flex align-items-center justify-content-center py-4"
        >
          <FaCalendarAlt className="me-2" size={24} />
          Nenhum evento encontrado.
        </Alert>
      ) : (
        <>
        <Row>
        {eventos.map((evento) => (
          <Col xs={12} md={6} lg={4} className="mb-4" key={evento.uuid_code} title={evento.nome}>
            <Card
              className="h-100 shadow-sm"
              role={enableActions ? undefined : "button"}
              style={{
                cursor: enableActions ? "default" : "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onClick={() => !enableActions && navigate(`/eventos/${evento.uuid_code}`)}
              onMouseEnter={(e) => {
                if (!enableActions) {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 15px rgba(0,0,0,0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (!enableActions) {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
                }
              }}
            >
              <Card.Body>
                <Card.Text className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
                  {formatarDataHora(evento.comeca_as)}
                </Card.Text>
                <Card.Title as="h4" className="mb-3">{evento.nome}</Card.Title>
                <Card.Text className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
                  {evento.endereco_evento}
                </Card.Text>

                {!enableActions && evento.is_inscrito && (
                  <Card.Footer className="text-success d-flex align-items-center" style={{ fontSize: "0.9rem" }}>
                    <FaCheck className="me-2" />
                    <strong>INSCRITO!</strong>
                  </Card.Footer>
                )}
                {enableActions && (
                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate(`/eventos/${evento.uuid_code}/editar`)}
                    >
                      <FaEdit className="me-1 align-middle" style={{ fontSize: "1em" }} />
                      <span className="align-middle">Editar</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteClick(evento.uuid_code)}
                    >
                      <FaTrash className="me-1 align-middle" style={{ fontSize: "1em" }} />
                      <span className="align-middle">Deletar</span>
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {enableActions && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar deleção</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deseja deletar este evento?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Não
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Sim
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={onPageChange}
      />
      </>
      )}
    </>
  );
};

export default EventosList;
