import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import './App.css'

import { AuthProvider } from "./context/AuthContext";

import React from 'react';
import { Toaster } from "react-hot-toast";
import MeusEventos from "./pages/eventos/MeusEventos";
import Criar from "./pages/eventos/Criar";
import Detalhes from "./pages/eventos/Detalhes";
import Editar from "./pages/eventos/Editar";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos/:id/editar" element={<Editar />} />
          <Route path="/eventos/:id" element={<Detalhes />} />
          <Route path="/eventos/novo" element={<Criar />} />
          <Route path="/eventos/meus" element={<MeusEventos />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;