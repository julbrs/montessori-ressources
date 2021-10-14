import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import firebase from "../../firebase/clientApp";
import { upload } from "./tools";

const aside = {
  marginBottom: 20,
};

var AddFile = (props) => {
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
        <div className="bg-gray-200 p-4 m-2 rounded-lg">
          <p>Merci de fournir un nom pour votre fichier:</p>
          <input
            className="w-full rounded-sm p-2 m-1 border border-gray-100"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
      );
    }
  };

  const createFile = async () => {
    setUploading(true);
    try {
      // initiate the document with no cards
      const doc = {
        type: "file",
        title: name,
        author: "Unknown",
        createdby: "auth",
        createdate: "",
        file: {},
      };
      const docRef = await firebase.firestore().collection("documents").add(doc);
      const docId = docRef.id;

      // then send file to Storage at the right path
      const fileDesc = await upload(file, firebase.storage(), `documents/${docId}/file`);

      // finally update the document object with the right file
      await firebase.firestore().collection("documents").doc(docId).update({ file: fileDesc });

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
        <button
          className="border rounded p-2 m-2"
          onClick={() => {
            setSuccess(!success);
            setFile(null);
          }}
        >
          Merci ! Recommencer un envoi ?
        </button>
      );
    } else {
      return (
        <div>
          {error != null && <p>Une erreur est survenue lors de l'envoi: {error}</p>}
          <button
            className="border rounded p-2 m-2"
            disabled={file === null || uploading}
            onClick={createFile}
          >
            Envoyer !
          </button>
        </div>
      );
    }
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <h2 className="text-2xl font-medium">Ajouter un fichier PDF !</h2>
      <div className="bg-gray-200 p-4 m-2 rounded-lg" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Déposer le fichier ici...</p>
        ) : (
          <div>
            <p>Déposer le fichier PDF ici, ou cliquez pour sélectionner le fichier</p>
          </div>
        )}
      </div>

      <aside style={aside}>{askName()}</aside>
      {renderActions()}
    </div>
  );
};

export default AddFile;
