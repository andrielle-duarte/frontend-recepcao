import Logo from "../../assets/Logo_ifrj_horizontal.png";
import { Link } from "react-router-dom";
import "../Topo/style.css"

export default function Topo () {
    return(
        <div className="container">
            <img src={Logo} alt="Logo do Ifrj"></img>
            <Link to="/visitantes"></Link>
        </div>
    )
}