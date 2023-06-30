// import { getDocument } from 'pdfjs-dist/legacy/build/pdf';


// import { pdfjs } from "react-pdf";

// // Specify the correct path to the worker script
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


const convertPdfToText = async (fileUrl) => {
  // try {
  //   const loadingTask = getDocument(fileUrl);
  //   const pdf = await loadingTask.promise;
  //   const totalNumPages = pdf.numPages;
  //   let text = "";

  //   for (let i = 1; i <= totalNumPages; i++) {
  //     const page = await pdf.getPage(i);
  //     const content = await page.getTextContent();
  //     const pageText = content.items.map((item) => item.str).join(" ");
  //     text += pageText + " ";
  //   }

  //   return text;
  // } catch (error) {
  //   console.log("Error with PDF to text conversion: " + error.message);
  // }
};

export default convertPdfToText;