import React, { useState } from "react";
import VisitantesCadastrados from "../../Components/ListaVisitantes";
import "./style.css"


export default function PainelAtivos({ atualizar }) {

  return (
    <div className="containerAtivos">
      <div className="painelAtivos">
        <VisitantesCadastrados atualizar={atualizar} somenteAtivos={true} />
      </div>
      
    </div>
  );
}
