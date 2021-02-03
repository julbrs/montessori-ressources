import React from "react";

// Create Document Component
const FilePrint = (props) => {
  const { document } = props;

  return (
    <iframe src={document.file.src} width="100%" height="600px" title="title">
      Lien: <a href={document.file.src}>Download PDF</a>
    </iframe>
  );
};

export default FilePrint;
