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
      <ul>
        <li><button onClick={irParaBuscar} className="btnMenu">
        Iniciar visita
        </button>
        </li>
        <li><button onClick={irParaAtivos} className="btnMenu">
        Ativos
        </button>
        </li>
        <li><button onClick={irParaLista} className="btnMenu">
        Cadastrados
        </button>
        </li>
        <li><button onClick={irParaHistorico} className="btnMenu">
        Histórico
        </button>
        </li>
        <li><Logout onLogout={onLogout} />
        </li>
      </ul>
    </div>
  );
}
