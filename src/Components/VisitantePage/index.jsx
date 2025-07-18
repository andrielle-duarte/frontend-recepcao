import React, { useState } from "react";
import VisitantesCadastrados from "../../Components/VisitantesCadastrados";
import { Link } from "react-router-dom";
import "../VisitantePage/style.css"

export default function VisitantesPage() {
  const [atualizar, setAtualizar] = useState(false);

  return (
    <div className="paginaVisitantes">
      <VisitantesCadastrados atualizar={atualizar} />
      <Link to="/" className="btnVoltar">← Voltar para o Cadastro</Link>
    </div>
  );
}
