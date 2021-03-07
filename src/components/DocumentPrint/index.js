import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { compose } from "recompose";

import FilePrint from "./file";
import NomenclatureType1Print from "./nomenclature-type1";
import NomenclatureType2Print from "./nomenclature-type2";
import { withFirebase } from "components/Firebase";
import withTracker from "../../tools/withTracker";

// Create Document Component
const DocumentPrint = (props) => {
  let { documentId } = useParams();
  const [document, setDocument] = useState();
  const {
    firebase: { db },
  } = props;

  useEffect(() => {
    db.collection("documents")
      .doc(documentId)
      .get()
      .then((doc) => {
        setDocument(doc.data());
      })
      .catch((err) => {
        console.err(err);
      });
  }, [db, documentId]);

  if (document === undefined) {
    return <p>Loading...</p>;
  } else if (document.type === "file") {
    return <FilePrint document={document} />;
  } else {
    if (document.nomenclature_type === 1) {
      return <NomenclatureType1Print document={document} />;
    } else {
      return <NomenclatureType2Print document={document} />;
    }
  }
};

export default compose(withFirebase, withTracker)(DocumentPrint);
