import React from "react";

import FileCard from "./file";
import NomenclatureCard from "./nomenclature";

const DocumentCard = (props) => {
  const { document } = props;
  if (document.type === "file") {
    return <FileCard document={document} />;
  } else {
    return <NomenclatureCard document={document} />;
  }
};
export default DocumentCard;
