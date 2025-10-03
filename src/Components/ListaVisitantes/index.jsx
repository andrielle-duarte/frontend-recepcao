import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import "./style.css";
import { calcularTempoPermanencia } from "../../utils/calcularTempoPermanencia";
import { getAllVisitantes, getVisitantesAtivos, encerrarVisita as encerrarVisitaApi } from "../../api";

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

export default function ListaVisitantes({ atualizar, somenteAtivos = false }) {
  const [visitantes, setVisitantes] = useState([]);
  const [tempoAtual, setTempoAtual] = useState(Date.now());
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);       
  const navigate = useNavigate();

  const fetchVisitantes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = somenteAtivos ? await getVisitantesAtivos() : await getAllVisitantes();
      setVisitantes(response.data);
    } catch (error) {
      console.error("Erro ao carregar visitantes:", error);
      setError("Erro ao carregar visitantes");
    } finally {
      setLoading(false);
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

  const handleEncerrarVisita = async (id) => {
    setLoading(true); 
    try {
      await encerrarVisitaApi(id);
      await fetchVisitantes();
    } catch (error) {
      console.error("Erro ao encerrar visita:", error);
      setError("Erro ao encerrar visita");
    } finally {
      setLoading(false);
    }
  };

  const verHistorico = (visitanteId) => navigate(`/historico/${visitanteId}`);

  if (loading) {
    return <p>Carregando visitantes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2>{somenteAtivos ? "Visitantes Ativos" : "Visitantes cadastrados"}</h2>

      {visitantes.length === 0 ? (
        <h2>Nenhum visitante {somenteAtivos ? "ativo" : "cadastrado"}.</h2>
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
                encerrarVisita={handleEncerrarVisita}
                verHistorico={verHistorico}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
