import React, { useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import ToastUtils from "../utils/toast";
import {authService} from "../services/authService";
import { useAuth } from "../context/AuthContext";
import LoginForm from "./forms/LoginForm";
import type { FormDataRegistro } from "../types/registro";
import RegistrarForm from "./forms/RegistrarForm";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);

  const {login} = useAuth()
  const handleLogin = async (data: { email: string; senha: string }) => {
    setLoading(true);
    try {
      await login(data);
      onLoginSuccess();
      onClose();
    } catch (err: any) {
      ToastUtils.error(err.message || "Erro ao logar");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: FormDataRegistro) => {
    if (data.senha1 !== data.senha2) {
      ToastUtils.error("As senhas não conferem");
      return;
    }
    if (data.senha1.length < 6 || data.senha2.length < 6){
      ToastUtils.error("As senhas precisam ter um tamanho mínimo de 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      await authService.register({
        primeiroNome: data.primeiroNome,
        ultimoNome: data.ultimoNome,
        email: data.email,
        senha: data.senha1,
      });
      ToastUtils.success("Cadastro realizado com sucesso!");
      setActiveTab("login");
    } catch (err: any) {
      ToastUtils.error(err.message || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
      justify
      contentClassName="rounded-4 shadow-lg p-3"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">
          {activeTab === "login" ? "Login" : "Cadastro"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-0">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k as "login" | "register")}
          className="mb-4"
          fill
          justify
        >
          <Tab eventKey="login" title="Login" className="pt-3">
            <LoginForm onSubmit={handleLogin} loading={loading} />
          </Tab>

          <Tab eventKey="register" title="Cadastro" className="pt-3">
            <RegistrarForm onSubmit={handleRegister} loading={loading} />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
