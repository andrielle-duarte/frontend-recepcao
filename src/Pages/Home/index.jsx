import { useState } from "react";
import FormVisitante from "./FormVisitante";
import ListaVisitantes from "./ListaVisitantes";
import "./style.css";

export default function Home() {
  const [atualizar, setAtualizar] = useState(false);

  const handleCadastro = () => {
    setAtualizar((prev) => !prev);
  };

  return (
    <div className="containerPrincipal">
      <div className="containerCadastrar">
        <FormVisitante onCadastro={handleCadastro} /> 
      </div>
      <div className="containerLista">
        <ListaVisitantes atualizar={atualizar} />
      </div>
    </div>
  );
}