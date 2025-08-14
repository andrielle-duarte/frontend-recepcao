import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { IoMdExit } from "react-icons/io";

export default function ListaVisitantes({ atualizar, somenteAtivos = false }) {
  const [visitantes, setVisitantes] = useState([]);
  const [tempoAtual, setTempoAtual] = useState(Date.now());

  //Condições com somenteAtivos para exibição numa rota ou em outra
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

  // Hook que chama fetchVisitantes ao montar o componente e quando as props 'atualizar' ou 'somenteAtivos' mudam
  useEffect(() => {
    fetchVisitantes();
  }, [atualizar, somenteAtivos]);

  // Hook para atualizar a interface a cada segundo quando exibindo visitantes ativos (para atualizar o tempo de permanência)
  useEffect(() => {
    if (somenteAtivos) {
      const intervalo = setInterval(() => {
        setTempoAtual(Date.now());
      }, 1000);
      return () => clearInterval(intervalo);
    }
  }, [somenteAtivos]);

  // Função que calcula o tempo de permanência de um visitante ativo, retornando tempo formatado e total em ms
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

  // Função para encerrar uma visita ativa, chamando o backend e atualizando a lista após sucesso
  const encerrarVisita = async (id) => {
    try {
      await axios.put(`http://localhost:8000/visitas/${id}/encerrar`);
      fetchVisitantes();
    } catch (error) {
      console.error("Erro ao encerrar visita:", error);
    }
  };

  // Hook de navegação para redirecionar entre páginas (para o histórico)
  const navigate = useNavigate();
  const verHistorico = (visitanteId) => {
    navigate(`/historico/${visitanteId}`);
  };

  // monta a tabela de visitantes, alterando colunas e botões conforme se mostra somente ativos ou todos
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
              {somenteAtivos && <th>Motivo</th>}
              {somenteAtivos && <th>Tempo de permanência</th>}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {visitantes.map((v) => {
              // calcula tempo de permanência para visitantes ativos e marca quem passou de 24h
              const { tempoFormatado, totalMs } = getTempoPermanencia(v.data_entrada);
              const passou24h = totalMs > 24 * 60 * 60 * 1000;

              return (
                <tr
                  key={v.id}
                  style={{
                    backgroundColor: somenteAtivos && passou24h ? "#f18e8eff" : "transparent",
                  }}
                >
                  <td>{somenteAtivos ? (v.visitante?.id ?? "-") : v.id}</td>
                  <td>{v.visitante?.nome ?? v.nome ?? "-"}</td>
                  <td>{v.visitante?.documento ?? v.documento ?? "-"}</td>
                  {somenteAtivos && <td>{v.motivo_visita || "-"}</td>}
                  {somenteAtivos && <td>{tempoFormatado}</td>}
                  <td>
                    {somenteAtivos ? (
                      // pra visitantes ativos, botão para encerrar visita
                      !v.data_saida && (
                        <button
                          className="btnEncerrarVisita"
                          onClick={() => encerrarVisita(v.id)}
                        >
                          Encerrar visita <IoMdExit size={20} color="#333" />
                        </button>
                      )
                    ) : (
                      // pra visitantes cadastrados, botões para iniciar visita** e ver histórico (*ainda vou ver)
                      <>
                        
                        <button
                          className="btnHistorico"
                          onClick={() => verHistorico(v.id)}
                        >
                          Histórico
                        </button>
                      </>
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
