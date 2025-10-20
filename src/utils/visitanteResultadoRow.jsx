import { useNavigate } from "react-router-dom";
import { alterarMotivo, iniciarVisita } from "../api";
import Swal from 'sweetalert2';

export function VisitanteResultadoRow({ visitante, atualizarLista }) {
  const navigate = useNavigate();

  const abrirModalMotivo = async () => {
    let motivo = (visitante.motivo_visita || "").trim();

    if (motivo) {
      const { isConfirmed, value: novoMotivo } = await Swal.fire({
        title: 'Motivo atual',
        text: `Motivo atual: "${motivo}". Deseja alterar antes de iniciar a visita?`,
        input: 'text',
        inputValue: motivo,
        showCancelButton: true,
        confirmButtonText: 'Alterar',
        cancelButtonText: 'Usar atual',
        inputValidator: (value) => {
          if (!value) {
            return 'Você precisa digitar um motivo!';
          }
          return null;
        }
      });

      if (isConfirmed && novoMotivo && novoMotivo !== motivo) {
        await alterarMotivo(visitante.id, novoMotivo);
        motivo = novoMotivo;
      }
    }
    return motivo;
  };

  const handleIniciarVisita = async () => {
    try {
      const motivoAtualizado = await abrirModalMotivo();

      await iniciarVisita(visitante.id, motivoAtualizado);

      await Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Visita iniciada com sucesso!',
      });

      atualizarLista?.();
    } catch (error) {
      if (error?.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: error.response.data?.detail || 'Requisição inválida.'
        });
      } else {
        console.error("Erro ao iniciar visita:", error);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro inesperado ao iniciar visita.'
        });
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
          <button onClick={handleIniciarVisita}>Iniciar visita</button>
          <button className="btnHistorico" onClick={verHistorico}>
            Histórico
          </button>
        </div>
      </td>
    </tr>
  );
}
