import React, { useState } from "react";
import ListaVisitantes from "../../Components/ListaVisitantes";
import "./style.css"


export default function PainelAtivos({ atualizar }) {

  return (
    <div>
        <ListaVisitantes atualizar={atualizar} somenteAtivos={true} />
      </div>
  );
}
