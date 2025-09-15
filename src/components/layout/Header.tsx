import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../LoginModal";
import { useState } from "react";

export default function Header() {
  const {isAuthenticated, logout} = useAuth()

  const handleLogout = async () => {
    await logout();
  };
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          <img
            src="/logo.svg"
            alt="Logo"
            height="40"
            width={160}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="fw-bold" as={NavLink} to="/">Início</Nav.Link>
            {isAuthenticated ? (
              <>
              <Nav.Link className="fw-bold" as={NavLink} to="/eventos/novo">Criar Evento</Nav.Link>
              <Nav.Link className="fw-bold" as={NavLink} to="/eventos/meus">Meus Eventos</Nav.Link>
              <Nav.Link className="fw-bold" onClick={handleLogout}>Sair</Nav.Link>
              </>
            ) : (
              <Nav.Link className="fw-bold" onClick={() => setShowLoginModal(true)}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => {
        setShowLoginModal(false);
        }}
      />
    </Navbar>
  );
}
