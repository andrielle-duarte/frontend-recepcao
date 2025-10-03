import Logo from "../../assets/Logo_ifrj_horizontal.png";
import { Link } from "react-router-dom";
import "../Topo/style.css"
import Navbar from "../Navbar";

export default function Topo({ onLogout }) {
  return (
    <div className="container">
      <img src={Logo} alt="Logo do Ifrj"/>
      <Navbar onLogout={onLogout} />
      <Link     to="/"></Link>
    </div>
  )
}