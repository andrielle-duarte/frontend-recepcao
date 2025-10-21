import { useNavigate } from "react-router-dom";
import "./style.css"; 

export default function Sucesso() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div className="sucesso-container">
      <div className="sucesso-card">
        <h1>Login realizado com sucesso!</h1>
        <p>Bem-vindo(a) ao sistema de recepção.</p>
        <button className="sucesso-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
