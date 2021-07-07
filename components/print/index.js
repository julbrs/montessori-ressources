import FilePrint from "./file";
import NomenclatureType1Print from "./nomenclature-type1";
import NomenclatureType2Print from "./nomenclature-type2";

const DocumentPdf = ({ document }) => {
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

export default DocumentPdf;
