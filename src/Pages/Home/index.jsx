import { useState } from "react";
import NovaVisita from "../NovaVisita/index";
import PainelAtivos from "../../Components/PainelAtivos/index";

import { useNavigate } from "react-router-dom";

import "./style.css";

export default function Home() {
  const [atualizar, setAtualizar] = useState(false);
  const navigate = useNavigate()

  const handleCadastro = () => {
    setAtualizar((prev) => !prev);
  };
  const irParaLista = () => {
    navigate("/visitantes");
  }

  return (
    <>
      <div className="containerBotaoVisitantes">
       
        <button onClick={irParaLista} className="btnVisitantes">
            Visitantes Cadastrados
        </button>
      </div>
      <div className="containerPrincipal">
        <div className="containerCadastrar">
          <NovaVisita onCadastro={handleCadastro} />
          
        </div>
        <div>
          <PainelAtivos atualizar={atualizar}  />
        </div>
      </div>
    </>
  );
}
