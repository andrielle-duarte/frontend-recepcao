import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import VisitantesPage from "../Pages/VisitantePage";
import Topo from "../Components/Topo";
import PainelAtivos from "../Pages/PainelAtivos";
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
      </Routes>
    </Router>
    <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}