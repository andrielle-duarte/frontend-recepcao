import { login } from "../../api";
import { useState } from "react";

import "./style.css";
export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        email: email,
        senha: senha,
      });

      const token = response.access_token;
      localStorage.setItem("token", token);
      onLogin(token);
    } catch (err) {
      setErro("Email ou senha inválidos.");
    }
  };
  return (
    <>
      <div className="containerLogin">
        <form className="conteudo" onSubmit={handleSubmit}>
          <h2 className="titulo">Login</h2>
          {erro && <p>{erro}</p>}
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
          <button className="botaoLogin" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}
