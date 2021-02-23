import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Box from "react-bulma-components/lib/components/box";
import Button from "react-bulma-components/lib/components/button";
import Heading from "react-bulma-components/lib/components/heading";
import Notification from "react-bulma-components/lib/components/notification";
import Content from "react-bulma-components/lib/components/content";
import {
  Input,
  Field,
  Label,
  Control,
} from "react-bulma-components/lib/components/form";
import { withFirebase } from "components/Firebase";
import { upload } from "./tools";
import * as DOCUMENTS from "../../constants/documents";

const aside = {
  marginBottom: 20,
};

var AddFile = (props) => {
  const {
    firebase: { db, storage },
  } = props;

  const [name, setName] = useState("Nouveau fichier");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setName(acceptedFiles[0].path);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "application/pdf",
    multiple: false,
    onDrop,
  });

  const askName = () => {
    if (file !== null) {
      return (
        <Box>
          <Content>
            <Field>
              <Label>Merci de fournir un nom pour votre fichier:</Label>
              <Control>
                <Input
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Control>
            </Field>
          </Content>
        </Box>
      );
    }
  };

  const createFile = async () => {
    setUploading(true);
    try {
      // initiate the document with no cards
      const doc = {
        type: DOCUMENTS.FILE,
        title: name,
        author: "Unknown",
        createdby: "auth",
        createdate: "",
        file: {},
      };
      const docRef = await db.collection("documents").add(doc);
      const docId = docRef.id;

      // then send file to Storage at the right path
      const fileDesc = await upload(file, storage, `documents/${docId}/file`);

      // finally update the document object with the right file
      await db.collection("documents").doc(docId).update({ file: fileDesc });

      // update the status then
      setUploading(false);
      setSuccess(true);
    } catch (error) {
      // if there is an error during the process then print it
      setUploading(false);
      setSuccess(false);
      setError(error);
    }
  };

  const renderActions = () => {
    if (success) {
      return (
        <Button
          onClick={() => {
            setSuccess(!success);
            setFile(null);
          }}
        >
          Merci ! Recommencer un envoi ?
        </Button>
      );
    } else {
      return (
        <Content>
          {error != null && (
            <Notification color="danger">
              Une erreur est survenue lors de l'envoi: {error}
            </Notification>
          )}
          <Button disabled={file === null || uploading} onClick={createFile}>
            Envoyer !
          </Button>
        </Content>
      );
    }
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <Heading size={5}>Ajouter un fichier PDF !</Heading>
      <Box>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Déposer le fichier ici...</p>
          ) : (
            <div>
              <p>
                Déposer le fichier PDF ici, ou cliquez pour sélectionner le
                fichier
              </p>
            </div>
          )}
        </div>
      </Box>

      <aside style={aside}>{askName()}</aside>
      {renderActions()}
    </div>
  );
};

export default withFirebase(AddFile);
