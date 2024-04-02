import ViewerComponent from "./ViewerComponent";
import { useEffect, useState } from "react";

const ShowPdf = ({data}) => {
  console.log(data)
  const [pdfURL, setPdfURL] = useState(null);
//console.log(pdfURL,"uty")
  useEffect(() => {
    const staticUrl = `${data}` 
    setPdfURL(staticUrl);
  }, [data]); // Load the PDF URL on component mount

  return (
    <div>
      <div className="PDF-viewer">
        {pdfURL && <ViewerComponent document={pdfURL} />}
      </div>
    </div>
  );
};

export default ShowPdf;
