
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


export default function BuscarResultado() {
    const location = useLocation();
    const navigate = useNavigate();
    const termoBusca = location.state?.termoBusca || "";
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        if (termoBusca) {
            axios.get(`http://localhost:8000/visitantes/buscar?termo=${termoBusca}`)
                .then((response) => {
                    setResultados(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao buscar visitantes", error);
                    alert("Erro ao buscar visitantes");
                });
        }
    }, [termoBusca]);

    return (
        <div className="containerResultados">
            <h2>Resultado da Busca</h2>
            {resultados.length > 0 ? (
                <table className="tabelaVisitantes">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Documento</th>
                            <th>Motivo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultados.map((visitante) => (
                            <tr key={visitante.id}>
                                <td>{visitante.id}</td>
                                <td>{visitante.nome}</td>
                                <td>{visitante.documento}</td>
                                <td>{visitante.motivo_visita || "-"}</td>
                                <td>
                                    <button onClick={() => alert(`Iniciar visita para ID: ${visitante.id}`)}>
                                        Iniciar Visita
                                    </button>
                                    {/*Colocar botão de alterar o motivo */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Nenhum visitante encontrado.</p>
            )}

            <button className="btnVoltar" onClick={() => navigate("/")}>
                ← Voltar
            </button>
        </div>
    );
}
