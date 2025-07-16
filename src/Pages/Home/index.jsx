import { useState } from "react";
import FormVisitante from "../FormVisitante/";
import PainelAtivos from "../PainelAtivos";
import ListaVisitantes from "../ListaVisitantes";
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
          <FormVisitante onCadastro={handleCadastro} />
          
        </div>
        <div>
          <PainelAtivos atualizar={atualizar}  />
        </div>
      </div>
    </>
  );
}
