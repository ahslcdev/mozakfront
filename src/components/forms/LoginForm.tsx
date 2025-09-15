import { useState, type FormEvent } from "react";
import { Button, Form } from "react-bootstrap";

interface LoginFormProps {
  onSubmit: (data: { email: string; senha: string }) => void;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading = false }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ email, senha });
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3">
        <Form.Group className="mb-2">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-3 shadow-sm"
            />
        </Form.Group>

        <Form.Group className="mb-2">
            <Form.Label className="fw-semibold">Senha</Form.Label>
            <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="rounded-3 shadow-sm"
            />
        </Form.Group>

        <div className="d-flex justify-content-center">
            <Button
                type="submit"
                disabled={loading}
                className="px-5 py-2 fw-semibold"
                variant="primary"
            >
                {loading ? "Entrando..." : "Entrar"}
            </Button>
        </div>
    </Form>
  );
};

export default LoginForm