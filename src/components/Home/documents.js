import React, { useState, useEffect } from "react";

import Document from "../DocumentCard";
import Columns from "react-bulma-components/lib/components/columns";
import { withFirebase } from "components/Firebase";

const Documents = (props) => {
  const {
    category,
    firebase: { db },
  } = props;

  const [loading, isLoading] = useState(true);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (category !== undefined) {
      // when a category is selected !
      db.collection("documents")
        .where("category_id", "==", category)
        .get()
        .then((querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => {
              let temp = doc.data();
              temp.id = doc.id;
              return temp;
            })
          );
          isLoading(false);
        });
    } else {
      // when no category selected
      db.collection("documents")
        .get()
        .then((querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => {
              let temp = doc.data();
              temp.id = doc.id;
              return temp;
            })
          );
          isLoading(false);
        });
    }
    // client.get("/nomenclatures").then((result) => {
    //   setDocuments(result.data);
    //   isLoading(false);
    // });
  }, [category, db]);

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <Columns multiline={true} breakpoint="desktop">
        {documents
          .filter((n) => n.status !== "DRAFT")
          .map((document) => (
            <Document key={document.id} document={document} />
          ))}
      </Columns>
    );
  }
};

export default withFirebase(Documents);
