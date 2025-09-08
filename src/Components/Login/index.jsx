// LoginButton.jsx
import React from 'react';
import keycloak from '../../keycloak';
import Topo from '../Topo';

function LoginButton() {
  const handleLogin = () => {
    keycloak.login(); // Vai redirecionar para o login do Keycloak
  };

  return (
    <>
      <Topo />
      <div className="formLogin">
        <div className="login">
          <h2 className='titulo' >Entrar no sistema</h2>
          <button className='btnVisitantes' onClick={handleLogin}>
          Usar Credenciais
        </button>
        </div>
      </div>
    </>
  );
}

export default LoginButton;
