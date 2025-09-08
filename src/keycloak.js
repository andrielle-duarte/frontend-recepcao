import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080/",
  realm: "recepcao",
  clientId: "recepcao-frontend",
});

export default keycloak;
