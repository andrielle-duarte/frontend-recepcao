import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Routes/app"; 
import "./index.css"
import keycloak from "./keycloak";

// Inicializa Keycloak
keycloak.init({
  onLoad: "login-required",
  checkLoginIframe: false, // evita warnings de CSP/iframe
}).then(authenticated => {
  if (!authenticated) {
    window.location.reload(); // força login
    return;
  }

  // Salva token
  localStorage.setItem("token", keycloak.token);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}).catch(err => {
  console.error("Keycloak init failed", err);
});
