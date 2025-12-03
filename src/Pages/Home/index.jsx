import { useState, useEffect } from "react";
import FormBusca from "../../Components/BuscaVisitante";
import "./style.css";

export default function Home() {
  const [atualizar, setAtualizar] = useState(false);

  const [resultados, setResultados] = useState([]);
  
  const handleCadastro = () => {
    setAtualizar((prev) => !prev);
  }; 
  
  return (
    <div className="centralizarTudo">
      <div >
        <div className="containerBuscar">
          <FormBusca onCadastro={handleCadastro} />
          
        </div>
      </div>
    </ div>
  );
}
