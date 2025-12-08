import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../../keycloak";
import App from "../../Routes/app";

export default function KeycloakWrapper() {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: "check-sso", checkLoginIframe: false }}
    >
      <App />
    </ReactKeycloakProvider>
  );
}
