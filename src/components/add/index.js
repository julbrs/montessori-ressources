import React, {useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import Box from 'react-bulma-components/lib/components/box';
import Progress from 'react-bulma-components/lib/components/progress';
import Button from 'react-bulma-components/lib/components/button';
import Heading from 'react-bulma-components/lib/components/heading';
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import Notification from 'react-bulma-components/lib/components/notification';
import Content from 'react-bulma-components/lib/components/content';
import Container from 'react-bulma-components/lib/components/container';
import {Input, Field, Label, Control} from 'react-bulma-components/lib/components/form';
import Resizer from 'react-image-file-resizer';
import client from '../../tools/client';

const aside = {
  marginBottom: 20,
}

var DropZone = () => {
  const [name, setName] = useState('Nouvelle nomenclature')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [myFiles, setMyFiles] = useState([])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setMyFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
        label: file.name
      })));
    }
  })

  // change the label of an image
  const handleLabelChange = (file, label) => {
    setMyFiles(myFiles.map((f) => {
        if(f.name === file.name) {
          f.label = label
        }
      return f
    })) 
  }



  const askName = () => {
    if(myFiles.length > 0) { 
      return (
        <Box>
              <Content>
                <Field>
                  <Label>Merci de fournir un nom pour votre nomenclature:</Label>
                  <Control>
                  <Input value={name} onChange={(event) => {
                    setName(event.target.value)
                  }}/>
                  </Control>
                </Field>
                </Content>
          </Box>
      )
    }
  }

  const preview = myFiles.map(file => (
    <Box key={file.name}>
      <Media>
      <Media.Item renderAs="figure" position="left">
        <Image size={128} alt={file.name} src={file.preview} />
      </Media.Item>
      <Media.Item>
        <Content>
        <Field>
          <Label>Vous pouvez fournir un label personnalisé pour cette image:</Label>
          <Control>
          <Input value={file.label} onChange={(event) => {
            handleLabelChange(file, event.target.value)
          }}/>
          </Control>
        </Field>
        </Content>
      </Media.Item>
    </Media>
  </Box>

  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    myFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }, [myFiles]);



  const renderProgress = () => {
    if (uploading || success) {
      return (
        <Progress max={100} value={uploadProgress} color="primary" size="medium" />
      );
    }
  }

const uploadFiles = async() => {
  setUploading(true)
  setUploadProgress(0)
  const fd = new FormData()

  // append the name of the nomenclature
  fd.append('name', name)

  // wrap the image resize in a promise
  let promises = myFiles.map((file) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        1200,
        1200,
        'JPEG',
        85,
        0,
        blob => {
          fd.append('photos', blob, file.label)
          resolve()
        },
        'blob'
      )
    })
  })

  // wait for each promise to resolve
  Promise.all(promises)
    .then(() => {
      const axiosConfig = {
        onUploadProgress: function(progressEvent) {
          setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
        }
      }

      //send `POST` request
      client.post('/nomenclatures',
      fd,
      axiosConfig)
      .then(() => {
        setUploading(false)
        setSuccess(true)
      })
      .catch((err) => {
        console.log(err.response)
        setUploading(false)
        setSuccess(false)
        setError(err.response.data.message)
      })
    })
}

const renderActions = () => {
if (success) {
  return (
    <Button
      onClick={() => {
        setSuccess(!success)
        setMyFiles([])
      }}
    >
      Merci ! Recommencer un envoi ?
    </Button>
  );
} else {
  return (
    <Content>
      {error != null && 
        <Notification color="danger">
          Une erreur est survenue lors de l'envoi: {error}
        </Notification>
      }
      <Button
        disabled={myFiles.length <= 0 || uploading}
        onClick={uploadFiles}
      >
        Envoyer !
      </Button>
    </Content>

  );
}
}

  return (
    <Container style={{marginBottom: "30px"}}>
      <Heading  size={5}>
        Vous pouvez participer à ce projet en fournissant vos propres images pour faire des
        nomenclatures !
      </Heading>
      <Heading subtitle size={5}>
        Utilisez simplement le formulaire ci-dessous pour déposer vos images,
        notre équipe se chargera de valider le contenu avant de le proposer sur notre outil. 
        Votre nom sera crédité sur la nomenclature.
      </Heading>
      <Box {...getRootProps()}>
        <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Déposer les fichiers ici...</p> : (
              <div>
                <p>Déposer les fichiers ici, ou cliquez pour sélectionner les fichiers</p>
                <p>Vous pouvez déposez tous les fichiers images de votre nomenclature.</p>
              </div>
            )
          }
      </Box>
      
      <aside style={aside}>
      {askName()}
        {preview}
      </aside>
      {renderActions()}
      {renderProgress()}
    </Container>
  )
}

export default DropZone
