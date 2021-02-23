import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Box from "react-bulma-components/lib/components/box";
import Button from "react-bulma-components/lib/components/button";
import Heading from "react-bulma-components/lib/components/heading";
import Media from "react-bulma-components/lib/components/media";
import Image from "react-bulma-components/lib/components/image";
import Notification from "react-bulma-components/lib/components/notification";
import Content from "react-bulma-components/lib/components/content";
import {
  Input,
  Field,
  Label,
  Control,
} from "react-bulma-components/lib/components/form";
import { withFirebase } from "components/Firebase";
import { resizeAndUpload } from "./tools";
import * as DOCUMENTS from "../../constants/documents";

const aside = {
  marginBottom: 20,
};

var AddNomenclature = (props) => {
  const {
    firebase: { db, storage },
  } = props;

  const [name, setName] = useState("Nouvelle nomenclature");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [myFiles, setMyFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setMyFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          label: file.name,
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  // change the label of an image
  const handleLabelChange = (file, label) => {
    setMyFiles(
      myFiles.map((f) => {
        if (f.name === file.name) {
          f.label = label;
        }
        return f;
      })
    );
  };

  const askName = () => {
    if (myFiles.length > 0) {
      return (
        <Box>
          <Content>
            <Field>
              <Label>Merci de fournir un nom pour votre nomenclature:</Label>
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

  const preview = myFiles.map((file) => (
    <Box key={file.name}>
      <Media>
        <Media.Item renderAs="figure" position="left">
          <Image size={128} alt={file.name} src={file.preview} />
        </Media.Item>
        <Media.Item>
          <Content>
            <Field>
              <Label>
                Vous pouvez fournir un label personnalisé pour cette image:
              </Label>
              <Control>
                <Input
                  value={file.label}
                  onChange={(event) => {
                    handleLabelChange(file, event.target.value);
                  }}
                />
              </Control>
            </Field>
          </Content>
        </Media.Item>
      </Media>
    </Box>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      myFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [myFiles]
  );

  const createNomenclature = async () => {
    setUploading(true);
    try {
      // initiate the document with no cards
      const doc = {
        type: DOCUMENTS.NOMENCLATURE,
        title: name,
        author: "Unknown",
        createdby: "auth",
        createdate: "",
        cards: [],
      };
      const docRef = await db.collection("documents").add(doc);
      const docId = docRef.id;

      // then resize and send files to Storage at the right path
      const cards = await Promise.all(
        myFiles.map((file, index) =>
          resizeAndUpload(
            file,
            storage,
            `documents/${docId}/cards/${index}/file`
          )
        )
      );

      // finally update the document object with the right cards
      await db.collection("documents").doc(docId).update({ cards });

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
            setMyFiles([]);
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
          <Button
            disabled={myFiles.length <= 0 || uploading}
            onClick={createNomenclature}
          >
            Envoyer !
          </Button>
        </Content>
      );
    }
  };

  return (
    <div>
      <Heading size={5}>Ajouter une nomenclature !</Heading>
      <Box>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Déposer les fichiers ici...</p>
          ) : (
            <div>
              <p>
                Déposer les fichiers ici, ou cliquez pour sélectionner les
                fichiers
              </p>
              <p>
                Vous pouvez déposez tous les fichiers images de votre
                nomenclature.
              </p>
            </div>
          )}
        </div>
      </Box>

      <aside style={aside}>
        {askName()}
        {preview}
      </aside>
      {renderActions()}
    </div>
  );
};

export default withFirebase(AddNomenclature);
