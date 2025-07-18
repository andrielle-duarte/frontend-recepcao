import React, { useState } from "react";
import VisitantesCadastrados from "../VisitantesCadastrados";
import "./style.css"

export default function PainelAtivos({ atualizar }) {
  
  return (
    <div className="containerAtivos">
      <div className="painelAtivos">
        <h2>Visitantes Ativos</h2>
        <VisitantesCadastrados atualizar={atualizar} somenteAtivos={true} />
      </div>
      
    </div>
  );
}
