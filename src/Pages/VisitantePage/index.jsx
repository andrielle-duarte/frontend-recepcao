import React, { useState } from "react";
import ListaVisitantes from "../../Components/ListaVisitantes"
import { Link } from "react-router-dom";
import "./style.css"

export default function VisitantesPage() {
  const [atualizar, setAtualizar] = useState(false);
  
  return (
    <>
      
      <div className="paginaVisitantes">
        <ListaVisitantes atualizar={atualizar} />
        
      </div>
    </>
  );
}
