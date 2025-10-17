import { useEffect, useState } from "react";
import { getHistorico } from "../../api";
import axios from "axios";
import "./style.css";

export default function Historico() {
  const [visitas, setVisitas] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  useEffect(() => {
    getHistorico()
      .then((res) => setVisitas(res.data))
      .catch((err) => {
        console.error("Erro ao buscar visitas:", err);
        alert("Erro ao buscar histórico");
      });
  }, []);

  // Filtrar visitas por data
  const visitasFiltradas = visitas.filter((v) => {
    const entrada = new Date(v.data_entrada);
    const inicio = dataInicio ? new Date(dataInicio) : null;

    const fim = dataFim
      ? new Date(new Date(dataFim).setHours(23, 59, 59, 999))
      : null;

    if (inicio && fim) return entrada >= inicio && entrada <= fim;
    if (inicio) return entrada >= inicio;
    if (fim) return entrada <= fim;
    return true;
  });

  return (
    <div className="containerHistorico">
      <h2>Histórico de visitas</h2>


      <div className="campo-data">
        <label>
          Data início:{" "}
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </label>
        <label className="campo-data">
          Data fim:{" "}
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </label>
        <button
          className="btnHistorico"
          onClick={() => {
            setDataInicio("");
            setDataFim("");
          }}
        >
          Limpar
        </button>
      </div>

      {visitasFiltradas.length > 0 ? (
        <table className="tabelaVisitas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Documento</th>
              <th>Motivo da Visita</th>
              <th>Data de entrada</th>
              <th>Data de saída</th>
            </tr>
          </thead>
          <tbody>
            {visitasFiltradas.map((v, index) => (
              <tr key={index}>
                <td data-label="ID">{v.id}</td>
                <td data-label="Nome">{v.nome}</td>
                <td data-label="Documento">{v.documento}</td>
                <td data-label="Motivo da Visita">{v.motivo_visita}</td>
                <td data-label="Data de entrada">{new Date(v.data_entrada).toLocaleString()}</td>
                <td data-label="Data de saída">{v.data_saida ? new Date(v.data_saida).toLocaleString() : ""}</td>
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
