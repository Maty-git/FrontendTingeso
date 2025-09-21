import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:9090/",
    realm: "ToolRent-realm",
    clientId: "toolrent-frontend",
});

export default keycloak;