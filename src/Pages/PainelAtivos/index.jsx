import React, { useState } from "react";
import ListaVisitantes from "../ListaVisitantes";
import "./style.css"

export default function PainelAtivos({ atualizar }) {
  
  return (
    <div className="containerAtivos">
      <div className="painelAtivos">
        <h2>Visitantes Ativos</h2>
        <ListaVisitantes atualizar={atualizar} somenteAtivos={true} />
      </div>
      
    </div>
  );
}
