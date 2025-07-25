import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import "./style.css";

const iniciarVisita = async (visitante, atualizarLista) => {
    try {
        // Checar se já tem uma visita ativa
        const respostaVisitas = await axios.get(`http://localhost:8000/visitas/historico/${visitante.id}`);
        const visitas = Array.isArray(respostaVisitas.data) ? respostaVisitas.data : []; // força como array
        const temVisitaAtiva = visitas.some(v => v.data_saida === null);

        if (temVisitaAtiva) {
            alert("Este visitante já está com uma visita ativa.");
            return;
        }

        let motivo = visitante.motivo_visita;

        if (motivo && motivo.trim()) {
            const desejaAlterar = window.confirm(`Motivo atual: "${motivo}". Deseja alterar antes de iniciar a visita?`);
            if (desejaAlterar) {
                const novoMotivo = prompt("Digite o novo motivo:", motivo);
                if (novoMotivo && novoMotivo.trim() !== "" && novoMotivo !== motivo) {
                    await alterarMotivo(visitante.id, novoMotivo.trim(), atualizarLista);
                    motivo = novoMotivo.trim();
                }
            }
        }

        // Agora sim: REGISTRAR UMA NOVA VISITA
        const dataEntrada = new Date().toISOString();

        await axios.post(`http://localhost:8000/visitas/`, {
            visitante_id: visitante.id,
            motivo_visita: motivo,
            data_entrada: dataEntrada,
        });

        alert("Visita iniciada com sucesso!");
        atualizarLista();
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
