import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import "./style.css";

export default function Navbar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (fn) => {
    fn();
    setMenuOpen(false);
  };

  return (
    <nav className="containerNavbar">
      <button
        className="navbar-hamburger"
        aria-label="Abrir menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </button>
      <ul className={`navbar-menu ${menuOpen ? "menu-open" : ""}`}>
        <li>
          <button onClick={() => handleNav(() => navigate("/"))} className="btnMenu">
            Iniciar visita
          </button>
        </li>
        <li>
          <button onClick={() => handleNav(() => navigate("/ativos"))} className="btnMenu">
            Ativos
          </button>
        </li>
        <li>
          <button onClick={() => handleNav(() => navigate("/visitantes"))} className="btnMenu">
            Cadastrados
          </button>
        </li>
        <li>
          <button onClick={() => handleNav(() => navigate("/historico"))} className="btnMenu">
            Histórico
          </button>
        </li>
        <li>
          <Logout onLogout={onLogout} />
        </li>
      </ul>
    </nav>
  );
}
