import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate()
  const irParaBuscar = () => {
    navigate("/");
  };
  const irParaLista = () => {
    navigate("/visitantes");
  };

  const irParaAtivos = () => {
    navigate("/ativos");
  };
  const irParaCadastro = () => {
    navigate("/cadastro")
  }
  const irParaHistorico = () => {
    navigate("/historico")
  }
  return (
    <>
      <div className="containerBotaoVisitantes">
        <button onClick={irParaBuscar} className="btnVisitantes">
          Buscar
        </button>
        <button onClick={irParaAtivos} className="btnVisitantes">
          Ativos
        </button>
        <button onClick={irParaLista} className="btnVisitantes">
          Cadastrados
        </button>
        <button onClick={irParaCadastro} className="btnVisitantes">
          Cadastrar
        </button>
        <button onClick={irParaHistorico} className="btnVisitantes">
          Histórico
        </button>
      </div>
    </>
  );
};
