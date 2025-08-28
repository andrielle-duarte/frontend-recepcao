import { useNavigate } from "react-router-dom";

export default function Sucesso() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login realizado com sucesso!</h1>
      <p>Bem-vindo(a) ao sistema de recepção.</p>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
}

