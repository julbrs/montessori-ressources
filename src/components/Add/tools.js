import Resizer from "react-image-file-resizer";

/**
 * This will resize the image using Resizer
 */
const resize = (file) =>
  new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      1200,
      1200,
      "PNG",
      85,
      0,
      (blob) => {
        // resolve by provide the blob element
        resolve(blob);
      },
      "blob"
    );
  });

export const resizeAndUpload = async (file, storage, filePath) => {
  const blob = await resize(file);
  var fileRef = storage.ref().child(filePath);
  const snapshot = await fileRef.put(blob, {
    contentType: "image/png",
  });
  const downloadURL = await snapshot.ref.getDownloadURL();
  return {
    name: file.label,
    file: {
      src: downloadURL,
      title: file.path,
    },
  };
};

export const upload = async (file, storage, filePath) => {
  var fileRef = storage.ref().child(filePath);
  const snapshot = await fileRef.put(file, {
    contentType: "application/pdf",
  });
  const downloadURL = await snapshot.ref.getDownloadURL();
  return {
    src: downloadURL,
    title: file.path,
  };
};
