import React, { useState } from "react";
import ListaVisitantes from "../../Components/ListaVisitantes"
import { Link } from "react-router-dom";
import "./style.css"
import { useNavigate } from "react-router-dom";


export default function VisitantesPage() {
  const [atualizar, setAtualizar] = useState(false);
  
  const navigate = useNavigate(); 
  const irParaBusca = () => {
    navigate("/");
  }

  const irParaAtivos = () => {
    navigate("/ativos")
  }
  return (
    <>
      <div className="containerBotaoVisitantes">

        <button onClick={irParaAtivos} className="btnVisitantes">
          Visitantes Ativos
        </button>
        <button onClick={irParaBusca} className="btnVisitantes">
          Tela de busca
        </button>
      </div>
      <div className="paginaVisitantes">
        <ListaVisitantes atualizar={atualizar} />
        
      </div>
    </>
  );
}
