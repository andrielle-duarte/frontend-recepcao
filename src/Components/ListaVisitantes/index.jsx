import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { IoMdExit } from "react-icons/io";

export default function ListaVisitantes({ atualizar, somenteAtivos = false }) {
  const [visitantes, setVisitantes] = useState([]);
  const [tempoAtual, setTempoAtual] = useState(Date.now());

  const fetchVisitantes = async () => {
    const url = somenteAtivos
      ? "http://localhost:8000/visitas/ativas"
      : "http://localhost:8000/visitantes";

    try {
      const response = await axios.get(url);
      setVisitantes(response.data);
    } catch (error) {
      console.error("Erro ao carregar visitantes:", error);
    }
  };

  useEffect(() => {
    fetchVisitantes();
  }, [atualizar, somenteAtivos]);

  // Atualiza o tempo a cada segundo para visitantes ativos
  useEffect(() => {
    if (somenteAtivos) {
      const intervalo = setInterval(() => {
        setTempoAtual(Date.now());
      }, 1000);
      return () => clearInterval(intervalo);
    }
  }, [somenteAtivos]);

  // Calcula o tempo de permanência para visitantes ativos
  function getTempoPermanencia(dataEntrada) {
    const entrada = new Date(dataEntrada);
    const agora = new Date();
    const diffMs = agora - entrada;

    const segundosTotais = Math.floor(diffMs / 1000);
    const horas = Math.floor(segundosTotais / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    const segundos = segundosTotais % 60;

    return {
      tempoFormatado:
        `${horas.toString().padStart(2, "0")}h ` +
        `${minutos.toString().padStart(2, "0")}m ` +
        `${segundos.toString().padStart(2, "0")}s`,
      totalMs: diffMs,
    };
  }

  const encerrarVisita = async (id) => {
    try {
      await axios.put(`http://localhost:8000/visitas/${id}/encerrar`);
      fetchVisitantes();
    } catch (error) {
      console.error("Erro ao encerrar visita:", error);
    }
  };

  return (
    <div className="containerLista">
      {visitantes.length === 0 ? (
        <p>Nenhum visitante {somenteAtivos ? "ativo" : "cadastrado"}.</p>
      ) : (
        <table className="tabelaVisitantes">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Documento</th>
              <th>Motivo</th>
              {somenteAtivos ? (
                <th>Tempo de permanência</th>
              ) : (
                <>
                  <th>Data Entrada</th>
                  <th>Data Saída</th>
                </>
              )}
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
                    backgroundColor: somenteAtivos && passou24h ? "#f18e8eff" : "transparent",
                  }}
                >
                  <td>{v.id}</td>
                  <td>{v.visitante?.nome ?? v.nome ?? "-"}</td>
                  <td>{v.visitante?.documento ?? v.documento ?? "-"}</td>
                  <td>{v.motivo_visita || "-"}</td>
                  {somenteAtivos ? (
                    <td>{tempoFormatado}</td>
                  ) : (
                    <>
                      <td>{new Date(v.data_entrada).toLocaleString()}</td>
                      <td>{v.data_saida ? new Date(v.data_saida).toLocaleString() : "-"}</td>
                    </>
                  )}
                  <td>
                    {somenteAtivos && !v.data_saida && (
                      <button
                        className="btnEncerrarVisita"
                        onClick={() => encerrarVisita(v.id)}
                      >
                        Encerrar visita <IoMdExit size={20} color="#333" />
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
