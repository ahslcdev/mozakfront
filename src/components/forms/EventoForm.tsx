import { useState } from "react";
import { IMaskInput } from "react-imask";
import ToastUtils from "../../utils/toast";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import type { FormDataEvento } from "../../types/evento";
import { converterDatetime } from "../../utils/utils";

interface EventoFormProps {
  initialData?: FormDataEvento;
  onSubmit: (data: FormDataEvento) => Promise<void>;
  isEdit: boolean;
}

const EventoForm: React.FC<EventoFormProps> = ({ initialData, onSubmit, isEdit=false }) => {
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
    ...initialData,
  });

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value, type, checked } = e.target;
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  const handleCepBlur = async () => {
    const cep = form.cep.replace(/\D/g, "");
    if (!cep) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) {
        ToastUtils.error("CEP não encontrado");
        return;
      }
      setForm({
        ...form,
        endereco: data.logradouro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
        complemento: data.complemento || "",
      });
    } catch (err) {
      ToastUtils.error("Erro ao consultar CEP");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4 text-center">{isEdit ? 'Editar': 'Criar'} Evento</h2>
      <Form onSubmit={handleSubmit}>
        <Card className="mb-3 shadow-sm">
          <Card.Header>Dados Básicos</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                size="sm"
                as="textarea"
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
              />
            </Form.Group>
          </Card.Body>
        </Card>

        <Card className="mb-3 shadow-sm">
          <Card.Header>Endereço</Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Label>CEP</Form.Label>
                <Form.Control
                    size="sm"
                  as={IMaskInput}
                  mask="00000-000"
                  value={form.cep}
                  onAccept={(value: string) => setForm({ ...form, cep: value })}
                  placeholder="00000-000"
                  onBlur={handleCepBlur}
                />
              </Col>
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="endereco"
                    value={form.endereco}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={1}>
                <Form.Group>
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="numero"
                    value={form.numero}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Complemento</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="complemento"
                    value={form.complemento}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="cidade"
                    value={form.cidade}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mb-3 shadow-sm">
          <Card.Header>Configurações do Evento</Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Data de Início</Form.Label>
                  <Form.Control
                    size="sm"
                    type="datetime-local"
                    name="comeca_as"
                    value={converterDatetime(form.comeca_as)}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Data de Término</Form.Label>
                  <Form.Control
                    size="sm"
                    type="datetime-local"
                    name="termina_as"
                    value={converterDatetime(form.termina_as)}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Máximo de Inscrições</Form.Label>
                  <Form.Control
                    size="sm" 
                    type="number"
                    name="max_inscricoes"
                    value={form.max_inscricoes}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  label="Ativo"
                  name="is_ativo"
                  checked={form.is_ativo}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        <div className="d-flex justify-content-center">
            <Button variant="primary" className="justify-content-end w-25" type="submit">
            {isEdit ? "Editar" : "Criar"}
            </Button>
        </div>
      </Form>
    </div>
  );
};

export default EventoForm;
