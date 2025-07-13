import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Home/style.css";

export default function ListaVisitantes({atualizar}) {
  const [visitantes, setVisitantes] = useState([]);

  const fetchVisitantes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/visitantes/");
      setVisitantes(response.data);
    } catch (error) {
      console.error("Erro ao carregar visitantes:", error);
    }
  };


  useEffect(() => {
    fetchVisitantes(); 
  }, []);

  useEffect(() => {
    fetchVisitantes(); 
  }, [atualizar]);

  return (
    <div className="containerLista">
      <h4 className="titulo">Visitantes cadastrados</h4>
      <ul>
        {visitantes.map(v => (
          <li key={v.id} className="listaItem">
            <strong>{v.nome}</strong> - 
            Documento: {v.documento} - 
            Motivo: {v.motivo_visita} - 
            Entrada: {new Date(v.data_entrada).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}