
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import "./style.css"

const iniciarVisita = async (visitanteId) => {
    try {
        const res = await axios.get(`http://localhost:8000/visitantes/${visitanteId}`);
        const visitante = res.data;

        if (visitante.data_entrada && !visitante.data_saida) {
            alert("Este visitante já está com uma visita ativa.");
            return;
        }

        const dataEntrada = new Date().toISOString();

        await axios.put(`http://localhost:8000/visitantes/${visitanteId}/iniciar`, {
            ...visitante,
            data_entrada: new Date().toLocaleString("sv-SE").replace(" ", "T"),
            data_saida: null,
        });

        alert("Visita iniciada com sucesso!");
    } catch (error) {
        console.error("Erro ao iniciar visita:", error);
        alert("Erro ao iniciar visita");
    }
};



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
                                    <button className="btnIniciar" onClick={() => iniciarVisita(visitante.id)}>
                                        Iniciar visita
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
