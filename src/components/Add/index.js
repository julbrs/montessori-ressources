import React from "react";
import Heading from "react-bulma-components/lib/components/heading";
import Container from "react-bulma-components/lib/components/container";

import { withAuthorization } from "../Session";
import AddNomenclature from "./nomenclature";
import AddFile from "./file";

var Add = () => {
  return (
    <Container style={{ marginBottom: "30px" }}>
      <Heading size={5}>
        Vous pouvez participer à ce projet en fournissant vos propres documents
        à ce projet!
      </Heading>
      <Heading subtitle size={5}>
        Utilisez simplement l'un des formulaires ci-dessous pour déposer vos{" "}
        <strong>images</strong> pour nomenclatures, ou fichiers{" "}
        <strong>pdf</strong>. Notre équipe se chargera de valider le contenu
        avant de le proposer sur notre outil. Votre nom sera crédité sur le
        document.
      </Heading>
      <AddNomenclature />
      <AddFile />
    </Container>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Add);
