import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoricoVisitas() {
  let params = useParams();
  let visitante = params.id
  
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/visitas/historico/${visitante}`)
      .then(res => setVisitas(res.data))
      .catch(err => {
        console.error("Erro ao buscar visitas:", err);
        alert("Erro ao buscar histórico");
      });
  }, [visitante]);

  return (
    <div>
      <h2>Histórico de Visitas - Visitante {visitante}</h2>
      {visitas.length > 0 ? (
        <ul>
          {visitas.map((v, index) => (
            <li key={index}>
              Motivo: {v.motivo_visita} <br />
              Entrada: {v.data_entrada} <br />
              Saída: {v.data_saida || "Em andamento"}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma visita registrada.</p>
      )}
    </div>
  );
}
