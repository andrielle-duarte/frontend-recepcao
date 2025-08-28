import { useNavigate } from "react-router-dom";

export default function Erro() {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/login");
  };

  return (
    <div >
      <h1>Erro no login</h1>
      <p>Email ou senha inválidos. Tente novamente.</p>
      <button onClick={handleVoltar} >
        Voltar ao login
      </button>
    </div>
  );
}
