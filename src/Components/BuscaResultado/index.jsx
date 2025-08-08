import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation} from "react-router-dom";

import "./style.css";

const alterarMotivo = async (visitante_id, motivo_visita) => {
  try {
    const response = await axios.put(`http://localhost:8000/visitantes/${visitante_id}/alterar-motivo`, {
      motivo_visita: motivo_visita,
    });
    console.log("Motivo alterado com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao alterar motivo:", error);
  }
}; 
const iniciarVisita = async (visitante, atualizarLista) => {
  try {
    let motivo = visitante.motivo_visita;

    // Pergunta se deseja alterar o motivo antes de iniciar a visita
    if (motivo && motivo.trim()) {
      const desejaAlterar = window.confirm(
        `Motivo atual: "${motivo}". Deseja alterar antes de iniciar a visita?`
      );
      if (desejaAlterar) {
        const novoMotivo = prompt("Digite o novo motivo:", motivo);
        if (novoMotivo && novoMotivo.trim() !== "" && novoMotivo !== motivo) {
          await alterarMotivo(visitante.id, novoMotivo.trim(), atualizarLista);
          motivo = novoMotivo.trim();
        }
      }
    }

    // Apenas um POST para registrar a visita
    const dataEntrada = new Date().toLocaleString("sv-SE").replace(" ", "T");

    await axios.post(`http://localhost:8000/visitas/`, {
      visitante_id: visitante.id,
      motivo_visita: motivo,
      data_entrada: dataEntrada,
    });

    alert("Visita iniciada com sucesso!");
    atualizarLista();
   } catch (error) {
    if (error.response && error.response.status === 400) {
      // Aqui está a mensagem do backend
      const mensagem = error.response.data.detail;
      alert(mensagem); // ou exiba em um toast, modal etc.
    } else {
      console.error("Erro ao iniciar visita:", error);
      alert("Erro inesperado ao iniciar visita.");
    }
  }
};

export default function BuscarResultado() {
  const location = useLocation();
  const termoBusca = location.state?.termoBusca || "";
  const [resultados, setResultados] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [novoMotivo, setNovoMotivo] = useState("");

  const buscarVisitantes = () => {
    if (termoBusca) {
      axios
        .get(`http://localhost:8000/visitantes/buscar?termo=${termoBusca}`)
        .then((response) => {
          setResultados(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar visitantes", error);
          alert("Erro ao buscar visitantes");
        });
    }
  };

  useEffect(() => {
    buscarVisitantes();
  }, [termoBusca]);

  return (
    <>
      <div className="containerResultados">
       
        {resultados.length > 0 ? (
          <table className="tabelaVisitantes">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Documento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((visitante) => (
                <tr key={visitante.id}>
                  <td>{visitante.id}</td>
                  <td>{visitante.nome}</td>
                  <td>{visitante.documento}</td>
                  <td>
                    <button
                      className="btnIniciar"
                      onClick={() => iniciarVisita(visitante, buscarVisitantes)}
                    >
                      Iniciar visita
                    </button>

                    <button
                      className="btnIniciar"
                      onClick={() => window.open(`/historico/${visitante.id}`)}
                    >
                      Consultar histórico de visitas
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum visitante encontrado.</p>
        )}
      </div>
    </>
  );
}
