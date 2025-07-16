import React, { useState } from "react";
import ListaVisitantes from "../ListaVisitantes/index";
import { Link } from "react-router-dom";
import "../VisitantePage/style.css"

export default function VisitantesPage() {
  const [atualizar, setAtualizar] = useState(false);

  return (
    <div className="paginaVisitantes">
      <ListaVisitantes atualizar={atualizar} />
      <Link to="/" className="btnVoltar">← Voltar para o Cadastro</Link>
    </div>
  );
}
