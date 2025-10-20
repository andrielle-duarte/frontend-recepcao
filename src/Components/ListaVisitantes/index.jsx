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

  // Define class dinâmica (linha-alerta para +24h, nada para o resto)
  const rowClass = somenteAtivos && passou24h ? "linha-alerta" : "";

  return (
    <tr className={rowClass}>
      <td data-label="ID">{idVisitante}</td>
      <td data-label="Nome">{nomeVisitante}</td>
      <td data-label="Documento">{documentoVisitante}</td>
      {somenteAtivos && <td data-label="Motivo">{visitante.motivo_visita || "-"}</td>}
      {somenteAtivos && <td data-label="Tempo de permanência">{tempoFormatado}</td>}
      <td data-label="Ações">
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
    <div className="containerCadastrados">
      <div className="painelCadastrados">
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
    </div>
    </div>
  );
}
