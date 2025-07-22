import { useState } from "react";
import FormBusca from "../../Components/BuscaVisitante";
import PainelAtivos from "../PainelAtivos"
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

export default function Home() {
  const [atualizar, setAtualizar] = useState(false);
  const navigate = useNavigate()

  const [resultados, setResultados] = useState([]);
  
  const handleCadastro = () => {
    setAtualizar((prev) => !prev);
  };
  const irParaLista = () => {
    navigate("/visitantes");
  }

  const irParaAtivos = () => {
    navigate("/ativos")
  }
  return (
    <>
      <div className="containerBotaoVisitantes">
       
        <button onClick={irParaAtivos} className="btnVisitantes">
             Ativos
        </button>
        <button onClick={irParaLista} className="btnVisitantes">
            Cadastrados
        </button>
      </div>
      <div className="containerPrincipal">
        <div className="containerCadastrar">
          <FormBusca onCadastro={handleCadastro} />
          
        </div>
        
        
      </div>
    </>
  );
}
