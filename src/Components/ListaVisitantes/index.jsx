import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import "./style.css";
import { getAllVisitantes, getVisitantesAtivos, encerrarVisita as encerrarVisitaApi } from "../../api";
import { calcularTempoPermanencia } from "../../utils/calcularTempoPermanencia";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

function VisitanteRow({ visitante, somenteAtivos, encerrarVisita, verHistorico, atualizarLista }) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Por favor, faça login novamente.");
    return null;
  }
  const decoded = jwtDecode(token);
  const isAdmin = decoded?.realm_access?.roles?.includes("admin");

  const handleDelete = async () => {
    const resultado = await Swal.fire({
      title: `Deseja realmente apagar o visitante ${visitante.nome}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Apagar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!resultado.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:8000/visitantes/${visitante.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire("Erro", `Erro ao apagar: ${errorData.detail}`, "error");
        return;
      }

      Swal.fire(
        "Apagado!",
        `Visitante ${visitante.nome} foi apagado pelo admin ${decoded.preferred_username}.`,
        "success"
      );

      atualizarLista();
    } catch (error) {
      console.error(error);
      Swal.fire("Erro", "Erro inesperado ao apagar visitante.", "error");
    }
  };

  const { tempoFormatado, totalMs } = calcularTempoPermanencia(visitante.data_entrada);
  const passou24h = totalMs > 24 * 60 * 60 * 1000;

  const idVisitante = somenteAtivos ? visitante.visitante?.id ?? "-" : visitante.id;
  const nomeVisitante = visitante.visitante?.nome ?? visitante.nome ?? "-";
  const documentoVisitante = visitante.visitante?.documento ?? visitante.documento ?? "-";

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
          <div className="acoes-row">
            <button className="btnHistorico" onClick={() => verHistorico(visitante.id)}>Histórico</button>
            {isAdmin && <button className="btnApagar" onClick={handleDelete}>Apagar</button>}
          </div>
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
                  atualizarLista={fetchVisitantes}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
