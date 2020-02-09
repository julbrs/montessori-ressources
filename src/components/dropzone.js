import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Resizer from 'react-image-file-resizer';
import './dropzone.css';
import {API} from '../config'

var DropZone = () => {
  const [success, setSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [uploading, setUploading] = useState(false)
  const [myFiles, setMyFiles] = useState([])


  const onDrop = useCallback(acceptedFiles => {
    setMyFiles([...myFiles, ...acceptedFiles])
  }, [myFiles])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop
  })

  const renderProgress = (file) => {
    const progress = uploadProgress[file.name];
    if (uploading || success) {
      return (
        <div>{progress ? progress.percentage : 0}</div>

      );
    }
  }

  const files = myFiles.map(file => (
    <div>{file.name} {renderProgress(file)}</div>
  ));

const uploadFiles = async() => {
  setUploading(true)
  setUploadProgress({})
  const fd = new FormData()

  // wrap the image resize in a promise
  let promises = myFiles.map((file) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        1650,
        1650,
        'PNG',
        100,
        0,
        blob => {
          fd.append('photos', blob, file.originalname)
          resolve()
        },
        'blob'
      )
    })
  })

  // wait for each promise to resolve
  Promise.all(promises)
    .then(() => {
      //send `POST` request
      fetch(`${API}/nomenclatures`, {
          method: 'POST',
          body: fd
      })
      .then(() => {
        setUploading(false)
        setSuccess(true)
      })
      .catch((err) => {
        console.log(err)
        setUploading(false)
        setSuccess(true)
      })
    })
}

const renderActions = () => {
if (success) {
  return (
    <button
      onClick={() => {
        setSuccess(!success)
        setMyFiles([])
      }}
    >
      Next
    </button>
  );
} else {
  return (
    <button
      disabled={myFiles.length <= 0 || uploading}
      onClick={uploadFiles}
    >
      Upload
    </button>
  );
}
}

  return (
    <div>
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> : (
              <div>
            <p>Drag 'n' drop some files here, or click to select files</p>
            <p>Select all the pictures for your nomenclature</p>

            </div>
          )
        }
      </div>
      {files}
      {renderActions()}
      <div>

      </div>
    </div>

  )
}

export default DropZone
