import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import "./style.css";

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const irParaBuscar = () => navigate("/");
  const irParaLista = () => navigate("/visitantes");
  const irParaAtivos = () => navigate("/ativos");
  const irParaHistorico = () => navigate("/historico");

  return (
    <div className="containerNavbar">
      <button onClick={irParaBuscar} className="btnVisitantes">
        Iniciar visita
      </button>
      <button onClick={irParaAtivos} className="btnVisitantes">
        Ativos
      </button>
      <button onClick={irParaLista} className="btnVisitantes">
        Cadastrados
      </button>
      <button onClick={irParaHistorico} className="btnVisitantes">
        Histórico
      </button>

      <Logout onLogout={onLogout} />
    </div>
  );
}
