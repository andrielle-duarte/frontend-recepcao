import { useNavigate } from "react-router-dom";
import "./style.css"; 

// Componente de página de erro de login
//Funciona quando o usuário insere credenciais inválidas fora do keycloak

export default function Erro() {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/login");
  };

  return (
    <div className="erro-container">
      <div className="erro-card">
        <h1>Erro no login</h1>
        <p>Email ou senha inválidos.<br />Tente novamente.</p>
        <button className="erro-btn" onClick={handleVoltar}>
          Voltar ao login
        </button>
      </div>
    </div>
  );
}