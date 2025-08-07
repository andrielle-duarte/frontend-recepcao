import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { IoMdExit } from "react-icons/io";

export default function ListaVisitantes({ atualizar }) {
  const [visitantes, setVisitantes] = useState([]);
  const [tempoAtual, setTempoAtual] = useState(Date.now());

  const fetchVisitantesAtivos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/visitas/ativas");
      setVisitantes(response.data);
    } catch (error) {
      console.error("Erro ao carregar visitantes ativos:", error);
    }
  };

  const fetchVisitantesTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/visitantes");
      setVisitantes(response.data);
    } catch (error) {
      console.error("Erro ao buscar visitantes:", error);
    }
  };

  useEffect(() => {
  

  // TO-DO: com use state
  //validar os estados para decidir entre:
  //fetchVisitantesTodos();
  //       OU
  fetchVisitantesAtivos();
}, [])

  function getTempoPermanencia(dataEntrada) {
    const entrada = new Date(dataEntrada);
    const agora = new Date();
    const diffMs = agora - entrada;

    const segundosTotais = Math.floor(diffMs / 1000);
    const horas = Math.floor(segundosTotais / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    const segundos = segundosTotais % 60;

    return {
      tempoFormatado: `${horas.toString().padStart(2, "0")}h ` +
        `${minutos.toString().padStart(2, "0")}m ` +
        `${segundos.toString().padStart(2, "0")}s`,
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
      await axios.put(`http://localhost:8000/visitas/${id}/encerrar`);
      fetchVisitantesAtivos();
    } catch (error) {
      console.error("Erro ao encerrar visita:", error);
    }
  };


  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempoAtual(() => Date.now());
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
              <th>Tempo de permanência</th>
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
                    backgroundColor: passou24h ? "#f18e8eff" : "transparent",
                  }}
                >
                  <td>{v.id}</td>
                  <td>{v.nome || "-"}</td>
                  <td>{v.documento || "-"}</td>
                  <td>{v.motivo_visita || "-"}</td>
                  <td>{tempoFormatado}</td>
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
