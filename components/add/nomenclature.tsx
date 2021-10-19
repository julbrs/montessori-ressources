import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { resizeAndUpload } from "./tools";
import firebase from "../../firebase/clientApp";
import Image from "next/image";

const aside = {
  marginBottom: 20,
};

var AddNomenclature = (props) => {
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
        <div className="bg-gray-200 p-4 m-2 rounded-lg">
          <p>Merci de fournir un nom pour votre nomenclature:</p>
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

  const preview = myFiles.map((file) => (
    <div className="bg-gray-200 p-4 m-2 rounded-lg flex flex-row" key={file.name}>
      <Image
        className="object-cover object-center h-28 w-28 m-2"
        width="128"
        height="128"
        unoptimized={true}
        alt={file.name}
        src={file.preview}
      />
      <div className="flex-grow">
        <p>Vous pouvez fournir un label personnalisé pour cette image:</p>
        <input
          className="w-full rounded-sm p-2 m-1 border border-gray-100"
          value={file.label}
          onChange={(event) => {
            handleLabelChange(file, event.target.value);
          }}
        />
      </div>
    </div>
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
    setError(null);
    try {
      // initiate the document with no cards
      const doc = {
        type: "nomenclature",
        title: name,
        validated: false,
        author: firebase.auth().currentUser.displayName,
        createdby: firebase.auth().currentUser.uid,
        createdate: firebase.firestore.FieldValue.serverTimestamp(),
        cards: [],
      };
      const docRef = await firebase.firestore().collection("documents").add(doc);
      const docId = docRef.id;

      // then resize and send files to Storage at the right path
      const cards = await Promise.all(
        myFiles.map((file, index) =>
          resizeAndUpload(file, firebase.storage(), `documents/${docId}/cards/${index}/file`)
        )
      );

      // finally update the document object with the right cards
      await firebase.firestore().collection("documents").doc(docId).update({ cards });

      // update the status then
      setUploading(false);
      setSuccess(true);
    } catch (error) {
      // if there is an error during the process then print it
      setUploading(false);
      setSuccess(false);
      setError(error.message);
    }
  };

  const renderActions = () => {
    if (success) {
      return (
        <button
          className="border rounded p-2 m-2"
          onClick={() => {
            setSuccess(!success);
            setMyFiles([]);
          }}
        >
          Merci ! Recommencer un envoi ?
        </button>
      );
    } else {
      return (
        <div>
          {error != null && <p>Une erreur est survenue lors de l&apos;envoi: {error}</p>}

          <button
            className="border rounded p-2 m-2 flex"
            disabled={myFiles.length <= 0 || uploading}
            onClick={createNomenclature}
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-b-2 m-1  border-gray-900 rounded-full animate-spin"></div>
                <span>Attendez...</span>
              </>
            ) : (
              <>
                <span>Envoyer !</span>
              </>
            )}
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-medium">Ajouter une nomenclature !</h2>
      <div className="bg-gray-200 p-4 m-2 rounded-lg" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Déposer les fichiers ici...</p>
        ) : (
          <div>
            <p>Déposer les fichiers ici, ou cliquez pour sélectionner les fichiers</p>
            <p>Vous pouvez déposez tous les fichiers images de votre nomenclature.</p>
          </div>
        )}
      </div>

      <aside style={aside}>
        {askName()}
        {preview}
      </aside>
      {renderActions()}
    </div>
  );
};

export default AddNomenclature;
