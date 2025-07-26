import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import VisitantesPage from "../Pages/VisitantePage";
import BuscarVisitante from "../Components/BuscaVisitante";
import BuscaResultado from "../Components/BuscaResultado";
import FormVisitante from "../Components/FormVisitante";
import Topo from "../Components/Topo";
import Navbar from "../Components/Navbar";
import PainelAtivos from "../Pages/PainelAtivos";
import HistoricoVisitas from "../Components/HistoricoVisitas";
import ErrorBoundary from "../Components/ErrorBoundary/errorBoundary"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";

export default function App() {
  const [atualizar, setAtualizar] = useState(false);

  const handleCadastro = () => {
    setAtualizar((prev) => !prev);
  };

  return (
    <>
      <ErrorBoundary>
        <Router>
          <Topo />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visitantes" element={<VisitantesPage />} />
            <Route path="/ativos" element={<PainelAtivos atualizar={atualizar}/>} />
            <Route path="/buscar" element={<BuscarVisitante />} />
            <Route path="/cadastro" element={<FormVisitante  onCadastro={handleCadastro}/>} />
            <Route path="/resultados" element={<BuscaResultado />} />
            <Route path="/historico/:id" element={<HistoricoVisitas />} />

          </Routes>
        </Router>
      </ErrorBoundary>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}