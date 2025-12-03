import keycloak from '../../keycloak';
import Topo from '../Topo';
import './style.css';

function LoginButton() {
  const handleLogin = () => {
    keycloak
      .login()
      .then(() => {
        if (keycloak.token) {
          localStorage.setItem("token", keycloak.token);
          onLogin(keycloak.token); 
        }
      })
      .catch((err) => console.error("Erro no login", err));
  };

  return (
    <>
      <Topo />
      <div className="containerLogin">
        <div className="formLogin">
          <h2 className="titulo">Entrar no sistema de Recepção</h2>
          <div className="login">
            <button className="btnVisitantes" onClick={handleLogin}>
              Usar Credenciais
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginButton;
