import { useNavigate } from "react-router-dom";

export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");

    onLogout(null);
    navigate("/login");
  };

  return (
    <button type="button" onClick={handleLogout} className="btnVisitantes">
      Logout
    </button>
  );
}
