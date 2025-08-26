import { login } from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    try {
      const response = await login({ email, senha });

      const { access_token, refresh_token } = response;
      localStorage.setItem("token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      onLogin(access_token);

      navigate("/sucesso");
    } catch (err) {
      const msg = err.response?.data?.detail || "Email ou senha inválidos.";
      setErro(msg);
      navigate("/erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerLogin">
      <form className="conteudo" onSubmit={handleSubmit}>
        <h2 className="titulo">Login</h2>
        {erro && <p className="erro">{erro}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button className="botaoLogin" type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
