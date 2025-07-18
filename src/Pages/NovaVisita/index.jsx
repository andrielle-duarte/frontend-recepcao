import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css"

export default function BuscarVisitante() {
    const [termoBusca, setTermoBusca] = useState("");
    const [resultados, setResultados] = useState([]);
    const navigate = useNavigate();

    const buscarVisitantes = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/visitantes/buscar?termo=${termoBusca}`);
            setResultados(response.data);
        } catch (err) {
            alert("Erro ao buscar visitantes");
        }
    };

    const iniciarVisita = (visitanteId) => {
        alert(`Iniciar visita para visitante ID: ${visitanteId}`);
    };

    return (
        <div className="containerBuscar">
            <form className="conteudo" onSubmit={e => e.preventDefault()}>
                <h2 className="titulo">Buscar Visitante</h2>
                <input
                    type="text"
                    placeholder="Digite nome ou CPF"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                />
                <button 
                    className="botaoBuscar" 
                    type="button"         
                    onClick={buscarVisitantes}
                >
                    Buscar
                </button>
                <button 
                    className="botaoBuscar"
                    type="button"
                    onClick={() => navigate("/cadastro")}
                >
                    Novo Cadastro
                </button>
            </form>
            <ul>
                {resultados.map((visitante) => (
                    <li key={visitante.id}>
                        <strong>{visitante.nome}</strong> — {visitante.documento}
                        <button onClick={() => iniciarVisita(visitante.id)}>Iniciar Visita</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
