import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();

    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
