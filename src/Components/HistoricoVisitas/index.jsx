import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoricoVisitas() {
  const { visitante_id } = useParams();
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/visitas/historico/${visitante_id}`)
      .then(res => setVisitas(res.data))
      .catch(err => {
        console.error("Erro ao buscar visitas:", err);
        alert("Erro ao buscar histórico");
      });
  }, [visitante_id]);

  return (
    <div>
      <h2>Histórico de Visitas - Visitante {visitante_id}</h2>
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
