import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState, useRef } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import NavBar from "../../../../../../components/NavBar";
import Head from "next/head";
import Image from "next/image";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ViewSubmission: React.FC = () => {

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log(numPages);
    setNumPages(numPages);
  };

  const handleScroll = () => {
    if (pdfContainerRef.current && numPages !== undefined) {
      const container = pdfContainerRef.current;
      const scrollTop = container.scrollTop;
      const pageHeight = container.scrollHeight / numPages;
      const newPageNumber = Math.floor(scrollTop / pageHeight) + 1;
      setPageNumber(newPageNumber);
    }
  };

  const goToPage = () => {
    if (inputRef.current && numPages !== undefined) {
      const enteredPage = parseInt(inputRef.current.value, 10);
      if (
        enteredPage >= 1 &&
        enteredPage <= numPages &&
        enteredPage !== pageNumber
      ) {
        setPageNumber(enteredPage);
        if (pdfContainerRef.current) {
          const container = pdfContainerRef.current;
          const pageHeight = container.scrollHeight / numPages;
          container.scrollTop = (enteredPage - 1) * pageHeight;
        }
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      goToPage();
    }
  };

  useEffect(() => {
    if (pdfContainerRef.current) {
      pdfContainerRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (pdfContainerRef.current) {
        pdfContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [numPages]);

  return (
    <>
      <Head>
        <title>Assignments - WriteSpace</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <div className="bg-gray-50 min-h-screen">
        <div className="flex justify-center mb-4">
          <div
            className="mt-12 max-w-md h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
            ref={pdfContainerRef}
          >
            <Document file="/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={400}
                  renderTextLayer={false}
                />
              ))}
            </Document>
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            <input
              ref={inputRef}
              type="number"
              className="border border-gray-300 rounded px-2 py-1"
              min={1}
              max={numPages}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={goToPage}
              className="bg-yellow-500 text-white font-bold py-1 px-2 rounded"
            >
              Go
            </button>
          </div>
          <p className="ml-4">
            Page {pageNumber} of {numPages}
          </p>
        </div>
      </div>
    </>

  );
};

export default ViewSubmission;