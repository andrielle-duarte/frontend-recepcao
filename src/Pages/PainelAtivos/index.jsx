import React, { useState } from "react";
import ListaVisitantes from "../ListaVisitantes";

export default function PainelAtivos({ atualizar }) {
  

  const handleAtualizacao = () => {
    setAtualizar((prev) => !prev);
  };

  return (
    <div className="painelAtivos">
      <h2>Visitantes Ativos</h2>
      <ListaVisitantes atualizar={atualizar} somenteAtivos={true} />
    </div>
  );
}
