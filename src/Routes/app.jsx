import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import VisitantesPage from "../../src/Components/VisitantePage";
import BuscarVisitante from "../Pages/NovaVisita/";
import FormVisitante from "../Pages/FormVisitante";
import Topo from "../Components/Topo";
import PainelAtivos from "../Components/PainelAtivos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
    <Router>
      <Topo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visitantes" element={<VisitantesPage />} />
        <Route path="/ativos" element={<PainelAtivos />} />
        <Route path="/buscar" element={<BuscarVisitante />} />
        <Route path="/cadastro" element={<FormVisitante />} />
      </Routes>
    </Router>
    <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}