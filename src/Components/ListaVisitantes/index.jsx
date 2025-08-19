import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import "./style.css";
import { calcularTempoPermanencia } from "../../utils/calcularTempoPermanencia"

// Componente para uma linha da tabela pra agilizar a reenderização dos dados 
function VisitanteRow({ visitante, somenteAtivos, encerrarVisita, verHistorico }) {
  const { tempoFormatado, totalMs } = calcularTempoPermanencia(visitante.data_entrada);
  const passou24h = totalMs > 24 * 60 * 60 * 1000;

  const idVisitante = somenteAtivos ? visitante.visitante?.id ?? "-" : visitante.id;
  const nomeVisitante = visitante.visitante?.nome ?? visitante.nome ?? "-";
  const documentoVisitante = visitante.visitante?.documento ?? visitante.documento ?? "-";

  return (
    <tr style={{ backgroundColor: somenteAtivos && passou24h ? "#f18e8eff" : "transparent" }}>
      <td>{idVisitante}</td>
      <td>{nomeVisitante}</td>
      <td>{documentoVisitante}</td>
      {somenteAtivos && <td>{visitante.motivo_visita || "-"}</td>}
      {somenteAtivos && <td>{tempoFormatado}</td>}
      <td>
        {somenteAtivos ? (
          !visitante.data_saida && (
            <button className="btnEncerrarVisita" onClick={() => encerrarVisita(visitante.id)}>
              Encerrar visita <IoMdExit size={20} color="#333" />
            </button>
          )
        ) : (
          <button className="btnHistorico" onClick={() => verHistorico(visitante.id)}>
            Histórico
          </button>
        )}
      </td>
    </tr>
  );
}

// Componente principal
export default function ListaVisitantes({ atualizar, somenteAtivos = false }) {
  const [visitantes, setVisitantes] = useState([]);
  const [tempoAtual, setTempoAtual] = useState(Date.now());
  const navigate = useNavigate();

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

  useEffect(() => {
    if (somenteAtivos) {
      const intervalo = setInterval(() => setTempoAtual(Date.now()), 1000);
      return () => clearInterval(intervalo);
    }
  }, [somenteAtivos]);

  const encerrarVisita = async (id) => {
    try {
      await axios.put(`http://localhost:8000/visitas/${id}/encerrar`);
      fetchVisitantes();
    } catch (error) {
      console.error("Erro ao encerrar visita:", error);
    }
  };

  const verHistorico = (visitanteId) => navigate(`/historico/${visitanteId}`);

  return (
    <div className="containerLista">
      
      <h2> {somenteAtivos ? "Visitantes Ativos" : "Visitantes cadastrados"} </h2>

      {visitantes.length === 0 ? (
        
        <p>Nenhum visitante {somenteAtivos ? "ativo" : "cadastrado"}.</p>
      ) : (
        
        <table className="tabelaVisitantes">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Documento</th>
              {somenteAtivos && <th>Motivo</th>}
              {somenteAtivos && <th>Tempo de permanência</th>}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {visitantes.map((v) => (
              <VisitanteRow
                key={v.id}
                visitante={v}
                somenteAtivos={somenteAtivos}
                encerrarVisita={encerrarVisita}
                verHistorico={verHistorico}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
