import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function FormBusca() {
    const [termoBusca, setTermoBusca] = useState("");
    const navigate = useNavigate();

    const buscar = () => {
        if (termoBusca.trim() === "") return;
        navigate("/resultados", { state: { termoBusca } });
    };

    return (
        <form className="conteudo" onSubmit={(e) => e.preventDefault()}>
            <h2 className="titulo">Iniciar visita</h2>
            <input
                type="text"
                placeholder="Digite nome ou CPF"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
            />
            <button type="button" className="botaoBuscar" onClick={buscar}>
                Buscar visitante
            </button>
            <button
                type="button"
                className="botaoBuscar"
                onClick={() => navigate("/cadastro")}
            >
                Cadastrar novo visitante
            </button>
        </form>
    );
}
