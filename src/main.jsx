import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Routes/app";
import keycloak from "./keycloak";
import "./index.css";

keycloak
  .init({ onLoad: "check-sso", promiseType: "native" })
  .then((authenticated) => {
    if (authenticated && keycloak.token) {
      localStorage.setItem("token", keycloak.token);
    }

    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((err) => console.error("Erro ao inicializar Keycloak", err));
