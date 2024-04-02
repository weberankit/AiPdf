import ViewerComponent from "./ViewerComponent";
import { useEffect, useState } from "react";

const ShowPdf = ({data}) => {
  console.log(data)
  const [pdfURL, setPdfURL] = useState(null);

  useEffect(() => {
    const staticUrl = `${data}` 
    setPdfURL(staticUrl);
  }, []); // Load the PDF URL on component mount

  return (
    <div>
      <div className="PDF-viewer">
        {pdfURL && <ViewerComponent document={pdfURL} />}
      </div>
    </div>
  );
};

export default ShowPdf;
