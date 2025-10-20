import "./style.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="containerFooter">
        <span>Instituto Federal do Rio de Janeiro</span>
        <span className="footer-sep mobile-hide">|</span>
        <span>Sistema de Recepção - IFRJ</span>
        <span className="footer-sep mobile-hide">|</span>
        <span className="footer-credit mobile-hide">
          Desenvolvido por Andrielle Duarte 
        </span>
      </div>
    </footer>
  );
}
