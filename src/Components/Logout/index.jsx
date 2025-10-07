import { useNavigate } from "react-router-dom";

export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  onLogout(null);
  navigate("/login");
  console.log("Logout realizado com sucesso!");
}

  return (
    <button type="button" onClick={handleLogout} className="btnMenu">
      Logout
    </button>
  );
}
