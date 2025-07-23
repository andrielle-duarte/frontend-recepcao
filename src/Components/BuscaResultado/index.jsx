import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import "./style.css";

const iniciarVisita = async (visitante, atualizarLista) => {
    try {
        if (visitante.data_entrada && !visitante.data_saida) {
            alert("Este visitante já está com uma visita ativa.");
            return;
        }

        const dataEntrada = new Date().toISOString();

        await axios.put(`http://localhost:8000/visitantes/${visitante.id}/iniciar`, {
            ...visitante,
            data_entrada: new Date().toLocaleString("sv-SE").replace(" ", "T"),
            data_saida: null,
        });

        alert("Visita iniciada com sucesso!");
        atualizarLista(); // Atualiza a lista depois da alteração
    } catch (error) {
        console.error("Erro ao iniciar visita:", error);
        alert("Erro ao iniciar visita");
    }
};

const alterarMotivo = async (visitanteId, novoMotivo, atualizarLista) => {
    try {
        await axios.put(`http://localhost:8000/visitantes/${visitanteId}/alterarMotivo`, {
            motivo_visita: novoMotivo
        });

        alert("Motivo alterado com sucesso!");
        atualizarLista();
    } catch (error) {
        console.error("Erro ao alterar motivo:", error);
        alert("Erro ao alterar motivo");
    }
};

export default function BuscarResultado() {
    const location = useLocation();
    const navigate = useNavigate();
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
            <button className="btnVoltar" onClick={() => navigate("/")}>
                Tela de busca
            </button>

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
                                    <td>
                                        {editandoId === visitante.id ? (
                                            <input
                                                type="text"
                                                value={novoMotivo}
                                                onChange={(e) => setNovoMotivo(e.target.value)}
                                            />
                                        ) : (
                                            visitante.motivo_visita || "-"
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btnIniciar"
                                            onClick={() => iniciarVisita(visitante, buscarVisitantes)}
                                        >
                                            Iniciar visita
                                        </button>

                                        {editandoId === visitante.id ? (
                                            <>
                                                <button className="btnIniciar"
                                                    onClick={() => {
                                                        alterarMotivo(visitante.id, novoMotivo, buscarVisitantes);
                                                        setEditandoId(null);
                                                    }}
                                                >
                                                    Salvar
                                                </button>
                                                <button className="btnIniciar" onClick={() => setEditandoId(null)}>Cancelar</button>
                                            </>
                                        ) : (
                                            <button className="btnIniciar"
                                                onClick={() => {
                                                    setEditandoId(visitante.id);
                                                    setNovoMotivo(visitante.motivo_visita || "");
                                                }}
                                            >
                                                Alterar motivo
                                            </button>
                                        )}
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
