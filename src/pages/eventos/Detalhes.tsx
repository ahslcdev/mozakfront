import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ToastUtils from "../../utils/toast";
import eventoService, { type Evento } from "../../services/eventoService";
import LoginModal from "../../components/LoginModal";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { formatarDataHora } from "../../utils/utils";

const EventoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchEvento = async () => {
      try {
        if (!id) {
          ToastUtils.error("Evento inválido");
          navigate("/");
          return;
        }
        const data = await eventoService.getById(id);
        setEvento(data);
      } catch (error) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    

    fetchEvento();
  }, [id, navigate]);

  const handleCancelarInscricao = async () => {
    try {
      await eventoService.cancelarInscricao(id);
      fetchEvento()
    } catch (err) {
      ToastUtils.error("Erro ao cancelar a inscrição no evento.");
    }
  }
  const handleInscrever = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    console.log(id)
    try {
      await eventoService.inscrever(id);
      fetchEvento()
    } catch (err) {
      ToastUtils.error("Erro ao se inscrever");
    }
  };

  if (loading) return <p className="container py-4">Carregando evento...</p>;

  if (!evento) return null;

  return (
    <div className="container">
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h3" className="mb-5">
            {evento.nome}
          </Card.Title>

          <div className="d-flex align-items-center mb-2">
            <FaClock className="me-2 text-muted" />
            <div>
              <p className="mb-1">
                <strong>Início:</strong> {formatarDataHora(evento.comeca_as)}
              </p>
              <p className="mb-0">
                <strong>Término:</strong> {formatarDataHora(evento.termina_as)}
              </p>
            </div>
          </div>

          <Row className="align-items-center mb-3">
            <Col className="d-flex align-items-center">
              <FaMapMarkerAlt className="me-2 text-muted" />
              <span>{evento.endereco_evento}</span>
            </Col>
          </Row>
          <Card.Text>{evento.descricao}</Card.Text>
          {evento.is_inscrito ? (
            <>
              <Col xs="auto mt-5">
                <Button size="lg" variant="danger" onClick={handleCancelarInscricao}>
                  Cancelar Inscrição
                </Button>
              </Col>
            </>
          ) : (
            <>
              <Col xs="auto mt-5">
                <Button size="lg" variant="primary" onClick={handleInscrever}>
                  Inscrever
                </Button>
              </Col>
            </>
          )
          }
          
        </Card.Body>
      </Card>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => {
        setShowLoginModal(false);
        handleInscrever();
        }}
        />
    </div>
  );
};

export default EventoDetalhes;
