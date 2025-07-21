import React, { useState } from "react";
import VisitantesCadastrados from "../../Components/ListaVisitantes";
import "./style.css"
import { Link, useNavigate } from "react-router-dom";

export default function PainelAtivos({ atualizar }) {
  const navigate = useNavigate();

  return (
    <div className="containerAtivos">
      <div className="painelAtivos">
        
        <Link to="/" className="btnVoltar">Tela de busca</Link>
        <VisitantesCadastrados atualizar={atualizar} somenteAtivos={true} />
      </div>
      
    </div>
  );
}
