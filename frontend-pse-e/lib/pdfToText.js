import { getDocument } from 'pdfjs-dist/legacy/build/pdf';
import { pdfjs } from "react-pdf";

// Specify the correct path to the worker script
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from "../pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const convertPdfToText = async (fileUrl) => {

  try {
    const loadingTask = getDocument(fileUrl);
    const pdf = await loadingTask.promise;
    const totalNumPages = pdf.numPages;
    let text = "";

    for (let i = 1; i <= totalNumPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      text += pageText + " ";
    }

    return text;
  } catch (error) {
    console.log("Error with PDF to text conversion: " + error.message);
  }
};

export default convertPdfToText;