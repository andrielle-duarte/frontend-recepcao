import { useNavigate } from "react-router-dom";
import { alterarMotivo, iniciarVisita } from "../api";

export function VisitanteResultadoRow({ visitante, atualizarLista }) {
  const navigate = useNavigate();

  const handleIniciarVisita = async () => {
    try {
      let motivo = (visitante.motivo_visita || "").trim();

      if (motivo) {
        const desejaAlterar = window.confirm(
          `Motivo atual: "${motivo}". Deseja alterar antes de iniciar a visita?`
        );
        if (desejaAlterar) {
          const novoMotivo = (prompt("Digite o novo motivo:", motivo) || "").trim();
          if (novoMotivo && novoMotivo !== motivo) {
            await alterarMotivo(visitante.id, novoMotivo);
            motivo = novoMotivo;
          }
        }
      }

      await iniciarVisita(visitante.id, motivo);
      // toast.success("Visita iniciada com sucesso!");
      alert("Visita iniciada com sucesso!");
      atualizarLista?.();
    } catch (error) {
      if (error?.response?.status === 400) {
        alert(error.response.data?.detail || "Requisição inválida.");
      } else {
        console.error("Erro ao iniciar visita:", error);
        alert("Erro inesperado ao iniciar visita.");
      }
    }
  };

  const verHistorico = () => navigate(`/historico/${visitante.id}`);

  return (
    <tr>
      <td>{visitante.id}</td>
      <td>{visitante.nome}</td>
      <td>{visitante.documento}</td>
      <td data-label="Ações">
        <div className="acoes-row">
          <button className="btnIniciar" onClick={handleIniciarVisita}>
            Iniciar visita
          </button>
          <button className="btnHistorico" onClick={verHistorico}>
            Histórico
          </button>
        </div>
      </td>
    </tr >
  );
}
