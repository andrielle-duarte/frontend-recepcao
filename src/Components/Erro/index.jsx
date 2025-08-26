import { useNavigate } from "react-router-dom";

export default function Erro() {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Erro no login</h1>
      <p>Email ou senha inválidos. Tente novamente.</p>
      <button onClick={handleVoltar} style={{ marginTop: "20px" }}>
        Voltar ao login
      </button>
    </div>
  );
}
