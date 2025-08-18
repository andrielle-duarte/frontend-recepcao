import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

export default function Historico() {

  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/visitas/historico/`)
      .then((res) => setVisitas(res.data))
      .catch((err) => {
        console.error("Erro ao buscar visitas:", err);
        alert("Erro ao buscar histórico");
      });
  });

  return (
    <div className="containerVisitas">
      <h2>Historico de visitas</h2>
      {visitas.length > 0 ? (
        <table className="tabelaVisitas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Motivo da Visita</th>
              <th>Data de entrada</th>
              <th>Data de saída</th>
            </tr>
          </thead>
          <tbody>
            {visitas.map((v, index) => (
              <tr key={index}>
                <td>{v.id}</td>
                <td>{v.motivo_visita}</td>
                <td>{new Date(v.data_entrada).toLocaleString()}</td>
                <td>
                  {v.data_saida
                    ? new Date(v.data_saida ).toLocaleString()
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum visitante encontrado.</p>
      )}
    </div>
  );
}
