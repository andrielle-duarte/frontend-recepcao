import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { VisitanteResultadoRow } from "../../utils/visitanteResultadoRow";
import { getBuscarVisitante } from "../../api";
import Swal from "sweetalert2";


export default function BuscarResultado() {
  const location = useLocation();
  const navigate = useNavigate();
  const termoBusca = location.state?.termoBusca || "";
  const [loading, setLoading] = useState(true);
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);



  const buscarVisitantes = async (termoBusca) => {
    setLoading(true);
    setError(null);

    if (termoBusca) {
      try {
        // console.log("URL chamada:", getBuscarVisitante(termoBusca));
        const token = localStorage.getItem("token");

        const response = await axios.get(getBuscarVisitante(termoBusca), {
          headers: { Authorization: `Bearer ${token}` }
        });

        setResultados(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erro ao buscar visitantes", error);
        setError("Erro ao buscar visitantes");

        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao buscar visitantes: " + (error.response?.data?.detail || error.message)
        });
      }
      finally {
        setLoading(false);
      }
    } else {
      setResultados([]);
      navigate("/")

    }
  };

  useEffect(() => {
    buscarVisitantes(termoBusca);
  }, [termoBusca]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="containerResultados">
      <div className="painelResultados">
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
          <h2>Nenhum visitante encontrado.</h2>
        )}
      </div>
    </div>
  );
}
