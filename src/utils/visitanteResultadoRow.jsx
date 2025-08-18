import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const alterarMotivo = async (visitante_id, motivo_visita) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/visitantes/${visitante_id}/alterar-motivo`,
      { motivo_visita }
    );
    console.log("Motivo alterado com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao alterar motivo:", error);
  }
};

const iniciarVisita = async (visitante, atualizarLista) => {
  try {
    let motivo = visitante.motivo_visita || "";


    if (motivo.trim()) {
      const desejaAlterar = window.confirm(
        `Motivo atual: "${motivo}". Deseja alterar antes de iniciar a visita?`
      );
      if (desejaAlterar) {
        const novoMotivo = prompt("Digite o novo motivo:", motivo);
        if (novoMotivo && novoMotivo.trim() !== "" && novoMotivo !== motivo) {
          await alterarMotivo(visitante.id, novoMotivo.trim());
          motivo = novoMotivo.trim();
        }
      }
    }

    const dataEntrada = new Date().toISOString();

    await axios.post(`http://localhost:8000/visitas/`, {
      visitante_id: Number(visitante.id),
      motivo_visita: motivo,
      data_entrada: dataEntrada,
    });

    alert("Visita iniciada com sucesso!");
    console.log("Visita iniciada com sucesso!");
    atualizarLista();
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(error.response.data.detail);
    } else {
      console.error("Erro ao iniciar visita:", error);
      alert("Erro inesperado ao iniciar visita.");
    }
  }
};
// Componente para renderizar uma linha da tabela
export function VisitanteResultadoRow({ visitante, atualizarLista }) {
  const navigate = useNavigate();

  const verHistorico = () => {
    if (!visitante.id) {
      console.error("ID do visitante não definido!");
      return;
    }
    console.log("Navegando para histórico de visitante:", visitante.id);
    navigate(`/historico/${visitante.id}`);
  };
  return (
    <tr>
      <td>{visitante.id}</td>
      <td>{visitante.nome}</td>
      <td>{visitante.documento}</td>
      <td>
        <button
          className="btnIniciar"
          onClick={() => iniciarVisita(visitante, atualizarLista)}
        >
          Iniciar visita
        </button>

        <button className="btnHistorico" onClick={() => verHistorico(visitante.id)}>
          Histórico
        </button>
      </td>
    </tr>
  );
}
