import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import type { FormDataRegistro } from "../../types/registro";

interface RegisterFormProps {
  onSubmit: (data: FormDataRegistro) => void;
  loading?: boolean;
  initialData?: Partial<FormDataRegistro>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  loading = false,
  initialData = {},
}) => {
  const [form, setForm] = useState<FormDataRegistro>({
    primeiroNome: initialData.primeiroNome || "",
    ultimoNome: initialData.ultimoNome || "",
    email: initialData.email || "",
    senha1: initialData.senha1 || "",
    senha2: initialData.senha2 || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3">
  <Form.Group className="mb-3" controlId="regPrimeiroNome">
    <Form.Label className="fw-semibold">Primeiro Nome</Form.Label>
    <Form.Control
      type="text"
      name="primeiroNome"
      value={form.primeiroNome}
      onChange={handleChange}
      required
      className="rounded-3 shadow-sm"
      placeholder="Digite seu primeiro nome"
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="regUltimoNome">
    <Form.Label className="fw-semibold">Último Nome</Form.Label>
    <Form.Control
      type="text"
      name="ultimoNome"
      value={form.ultimoNome}
      onChange={handleChange}
      required
      className="rounded-3 shadow-sm"
      placeholder="Digite seu último nome"
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="regEmail">
    <Form.Label className="fw-semibold">Email</Form.Label>
    <Form.Control
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      required
      className="rounded-3 shadow-sm"
      placeholder="Digite seu email"
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="regSenha1">
    <Form.Label className="fw-semibold">Senha</Form.Label>
    <Form.Control
      type="password"
      name="senha1"
      value={form.senha1}
      onChange={handleChange}
      required
      className="rounded-3 shadow-sm"
      placeholder="Digite sua senha"
    />
  </Form.Group>

  <Form.Group className="mb-4" controlId="regSenha2">
    <Form.Label className="fw-semibold">Confirmar Senha</Form.Label>
    <Form.Control
      type="password"
      name="senha2"
      value={form.senha2}
      onChange={handleChange}
      required
      className="rounded-3 shadow-sm"
      placeholder="Confirme sua senha"
    />
  </Form.Group>

  <div className="d-flex justify-content-center">
    <Button
      variant="success"
      type="submit"
      disabled={loading}
      className="px-5 py-2 fw-semibold"
    >
      {loading ? "Cadastrando..." : "Cadastrar"}
    </Button>
  </div>
</Form>
  );
};

export default RegisterForm;
