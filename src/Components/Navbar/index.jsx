import { useNavigate, Link } from "react-router-dom";
import "./style.css";


export default function Navbar() {
  const navigate = useNavigate();
  const irParaBuscar = () => {
    navigate("/");
  };
  const irParaLista = () => {
    navigate("/visitantes");
  };

  const irParaAtivos = () => {
    navigate("/ativos");
  };

  const irParaHistorico = () => {
    navigate("/historico");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <>
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
        <button onClick={handleLogout}  className="btnVisitantes">Logout</button>
      </div>
    </>
  );
}
