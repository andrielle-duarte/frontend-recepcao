import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { IoMdExit } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

export default function ListaVisitantes({ atualizar }) {
  const [visitantes, setVisitantes] = useState([]);

  const fetchVisitantes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/visitantes/");
      setVisitantes(response.data);
    } catch (error) {
      console.error("Erro ao carregar visitantes:", error);
    }
  };

  const encerrarVisita = async (id) => {
  const visitante = visitantes.find(v => v.id === id);
  if (!visitante) return;

  const dataSaida = new Date();

  // Verifica se a data de saída é anterior à data de entrada
  const dataEntrada = new Date(visitante.data_entrada);
  if (dataSaida < dataEntrada) {
    alert("Erro: A data de saída não pode ser anterior à data de entrada.");
    return;
  }

  try {
    await axios.put(`http://localhost:8000/visitantes/${id}`, {
      ...visitante,
      data_saida: dataSaida.toLocaleString("sv-SE").replace(" ", "T"),
    });
    fetchVisitantes(); 
  } catch (error) {
    console.error("Erro ao encerrar visita:", error);
  }
};

  useEffect(() => {
    fetchVisitantes();
  }, []);

  useEffect(() => {
    fetchVisitantes();
  }, [atualizar]);

  return (
    <div className="containerLista">

      <h4 className="titulo">Visitantes cadastrados</h4>
      {visitantes.length === 0 ? (
        <p>Nenhum visitante cadastrado.</p>
      ) : (
        <table className="tabelaVisitantes">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Documento</th>
              <th>Motivo</th>
              <th>Data Entrada</th>
              <th>Data Saída</th>
              <th>Ações</th> 
            </tr>
          </thead>
          <tbody>
            {visitantes.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.nome}</td>
                <td>{v.documento}</td>
                <td>{v.motivo_visita || "-"}</td>
                <td>{v.data_entrada ? new Date(v.data_entrada).toLocaleString() : "-"}</td>
                <td>{v.data_saida ? new Date(v.data_saida).toLocaleString() : "-"}</td>
                <td>
                  {!v.data_saida && (
                    <button onClick={() => encerrarVisita(v.id)}>
                      <IoMdExit size={20} color="333" />
                    </button>
                    
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
