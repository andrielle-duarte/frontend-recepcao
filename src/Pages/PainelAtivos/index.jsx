import React, { useState } from "react";
import ListaVisitantes from "../../Components/ListaVisitantes";
import "./style.css"


export default function PainelAtivos({ atualizar }) {

  return (
    <div className="containerAtivos">
      <div className="painelAtivos">
        <ListaVisitantes atualizar={atualizar} somenteAtivos={true} />
      </div>
      
    </div>
  );
}
