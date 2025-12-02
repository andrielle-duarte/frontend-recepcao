import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Routes/app";
import "./index.css";
import keycloak from "./keycloak";


keycloak.init({ onLoad: "login-required", promiseType: "native"})
  .then(authenticated => {
    if (authenticated) {
      localStorage.setItem("token", keycloak.token);
    }
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch(err => console.error("Erro ao inicializar Keycloak", err));
