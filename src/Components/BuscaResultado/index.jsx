import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./style.css";
import { VisitanteResultadoRow } from "../../utils/visitanteResultadoRow";

export default function BuscarResultado() {
  const location = useLocation();
  const termoBusca = location.state?.termoBusca || "";
  const [resultados, setResultados] = useState([]);

  const buscarVisitantes = () => {
    if (termoBusca) {
      axios
        .get(`http://localhost:8000/visitantes/buscar?termo=${termoBusca}`)
        .then((response) => setResultados(response.data))
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
            {resultados.map((v) => (
              <VisitanteResultadoRow
                key={v.id}
                visitante={v}
                atualizarLista={buscarVisitantes}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum visitante encontrado.</p>
      )}
    </div>
  );
}
