import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import VisitantesPage from "../Pages/VisitantePage";
import BuscarVisitante from "../Components/BuscaVisitante";
import BuscaResultado from "../Components/BuscaResultado";
import FormVisitante from "../Components/FormVisitante";
import Topo from "../Components/Topo";
import PainelAtivos from "../Pages/PainelAtivos";
import ErrorBoundary from "../Components/ErrorBoundary/errorBoundary"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <Router>
          <Topo />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visitantes" element={<VisitantesPage />} />
            <Route path="/ativos" element={<PainelAtivos />} />
            <Route path="/buscar" element={<BuscarVisitante />} />
            <Route path="/cadastro" element={<FormVisitante />} />
            <Route path="/resultados" element={<BuscaResultado />} />
          </Routes>
        </Router>
      </ErrorBoundary>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
