import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { IoMdExit } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

export default function ListaVisitantes({ atualizar, somenteAtivos = false }) {
  const [visitantes, setVisitantes] = useState([]);

  const [tempoAtual, setTempoAtual] = useState(Date.now());

  const fetchVisitantes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/visitantes/");
      let data = response.data;

      if (somenteAtivos) {
        data = data.filter(
          (v) =>
            v.data_saida === null ||
            v.data_saida === "" ||
            v.data_saida === undefined
        );
      }

      setVisitantes(data);
    } catch (error) {
      console.error("Erro ao carregar visitantes:", error);
    }
  };

  function getTempoPermanencia(dataEntrada) {
    const entrada = new Date(dataEntrada);
    const agora = new Date();
    const diffMs = agora - entrada;

    const segundosTotais = Math.floor(diffMs / 1000);
    const horas = Math.floor(segundosTotais / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    const segundos = segundosTotais % 60;

    return {
      tempoFormatado: `${horas.toString().padStart(2, '0')}h ` +
        `${minutos.toString().padStart(2, '0')}m ` +
        `${segundos.toString().padStart(2, '0')}s`,
      totalMs: diffMs
    };
  }
  const encerrarVisita = async (id) => {
    const visitante = visitantes.find((v) => v.id === id);
    if (!visitante) return;

    const dataSaida = new Date();
    const dataEntrada = new Date(visitante.data_entrada);

    if (dataSaida < dataEntrada) {
      alert("Erro: A data de saída não pode ser anterior à data de entrada.");
      return;
    }

    try {
      await axios.put(`http://localhost:8000/visitantes/${id}/encerrar`, {
        ...visitante,
        data_saida: dataSaida.toLocaleString("sv-SE").replace(" ", "T"),
      });
      fetchVisitantes();
    } catch (error) {
      console.error("Erro ao encerrar visita:", error);
    }
  };

  useEffect(() => {
    fetchVisitantes();
  }, []);

  useEffect(() => {
    fetchVisitantes();
  }, [atualizar]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempoAtual(Date.now());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="containerLista">

      {visitantes.length === 0 ? (
        <p>Nenhum visitante ativo.</p>
      ) : (
        <table className="tabelaVisitantes">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Documento</th>
              <th>Motivo</th>
              {somenteAtivos && <th>Tempo de permanência</th>}
              {!somenteAtivos && <th>Data Entrada</th>}
              {!somenteAtivos && <th>Data Saída</th>}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {visitantes.map((v) => {
              const { tempoFormatado, totalMs } = getTempoPermanencia(v.data_entrada);
              const passou24h = totalMs > 24 * 60 * 60 * 1000;

              return (
                <tr
                  key={v.id}
                  style={{
                    backgroundColor: somenteAtivos && passou24h ? "#f18e8eff" : "transparent"
                  }}
                >
                  <td>{v.id}</td>
                  <td>{v.nome}</td>
                  <td>{v.documento}</td>
                  <td>{v.motivo_visita || "-"}</td>
                  {somenteAtivos && <td>{tempoFormatado}</td>}
                  {!somenteAtivos && (
                    <td>{v.data_entrada ? new Date(v.data_entrada).toLocaleString() : ""}</td>
                  )}
                  {!somenteAtivos && (
                    <td>{v.data_saida ? new Date(v.data_saida).toLocaleString() : ""}</td>
                  )}
                  <td>
                    {!v.data_saida && (
                      <button
                        className="btnEncerrarVisita"
                        onClick={() => encerrarVisita(v.id)}
                      >
                        Encerrar visita <IoMdExit size={20} color="333" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>
      )}
    </div>
  );
}
