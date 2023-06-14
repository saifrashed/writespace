import React, { useState } from "react";
import Button from "./stdButton";
import CloseButton from "./closeButton";
import PopConfetti from '../components/popConfetti';

import useSubmission from "@/lib/hooks/useSubmission";
import useAuthentication from "@/lib/hooks/useAuthentication";

const UploadPopup = ({ showPopup, togglePopup, assignmentId }) => {

    const [fileUploadSuccess, setFileUploadSuccess] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [remindConfirm, setRemindConfirm] = useState(false);
    const [remindFile, setRemindFile] = useState(false);
    const fileSizeLimit = 1 * 1048576;  // 1MB
    const { submitSubmission } = useSubmission()
    const { token } = useAuthentication()

    // Security measure: Remove shady characters from file name.
    const sanitizeString = (string) => {
        let sanitizedString = string.replace(/[^\w. _-]/g, "");

        // Edge case: sanitizedString is empty (outside of .pdf)
        if (sanitizedString === ".pdf") {
            sanitizedString = "nofilename.pdf";
        }
        return sanitizedString;
    };

    const handleInputChange = (event) => {  // When a user uploads a file.
        console.log("Upload input change event");
        const file = event.target.files[0];

        setFileUploadSuccess(false);

        // Security measure: sanitize metadata.
        const sanitizedFileType = sanitizeString(file.type);
        const sanitizedFileName = sanitizeString(file.name);
        console.log(file)
        if (!file) {
            setUploadedFile(null);
            setRemindFile(true);
            alert("Something went wrong: No file uploaded.");
        }
        // Security measure: Only accept pdf's.
        // Normally application/pdf, applicationpdf is sanitized version
        else if (sanitizedFileType !== "applicationpdf") {
            event.target.value = null;  // Reset the file input.
            setUploadedFile(null);
            setRemindFile(true);
            alert("Only .pdf files allowed.");  // Display error message.
        }
        // Security measure (against DoS): Max. file size
        else if (file.size > fileSizeLimit) {
            event.target.value = null;
            setUploadedFile(null);
            setRemindFile(true);
            alert("File size exceeds the limit.");
        }
        // Valid upload.
        else {
            setRemindFile(false)
            setUploadedFile({
                name: sanitizedFileName,
                file: file,
                size: file.size  // To show some functionality.
            });
        }
    };

    if (!showPopup) {
        return null;
    }

    return (
        // TO DO: Change to side-wide popup-style.
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg">
                <h2 className="text-3xl mb-4">Upload assignment</h2>

                {/* File select browse button.*/}
                <input type="file" onChange={(event) => { handleInputChange(event); }} />

                {/* No plagiarism confirmation checkbox */}
                <div className="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
                                  focus:ring-blue-500 dark:focus:ring-blue-600
                                  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                                  dark:border-gray-600"

                        onChange={(event) => {
                            setIsConfirmed(event.target.checked);
                            setRemindConfirm(!event.target.checked);
                        }} />
                    <label htmlFor="default-checkbox"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        I confirm the submitted work is my own.
                    </label>
                </div>


                {/* To show name sanitize functionality. */}
                {uploadedFile && (  // Show metadata.
                    <>
                        <p>Sanitized filename: {uploadedFile.name}</p>
                        <p>File size: {uploadedFile.size / 1000} kbytes</p>
                    </>
                )}

                {uploadedFile && isConfirmed && (  // Valid submission with checked box.
                    // Confirm button sends file to backend.
                    <Button onClick={() => submitSubmission(token, assignmentId, uploadedFile.file)}>Confirm</Button>
                )}
                {!uploadedFile && (  // Trigger for reminder file upload.
                    <Button onClick={() => {
                        setRemindFile(true);
                        setFileUploadSuccess(false);
                    }}>Confirm</Button>
                )}
                {!isConfirmed && uploadedFile && (  // Trigger for reminder checkbox.
                    <Button onClick={() => {
                        setRemindConfirm(true);
                        setFileUploadSuccess(false);
                    }}>Confirm</Button>
                )}

                <CloseButton onClick={() => {
                    togglePopup();
                    setUploadedFile(null);  // Reset to show no metadata on next popup open.
                    setIsConfirmed(false);
                    setRemindConfirm(false);
                    setRemindFile(false);
                    setFileUploadSuccess(false);
                }}>Close</CloseButton>

                {remindConfirm && (  // Show text to remind user to check checkbox.
                    <p>Please confirm that the work submitted is your own.</p>
                )}
                {remindFile && (  // Show text to remind user they still need to upload file.
                    <p>Please upload a file.</p>
                )}

                {fileUploadSuccess && (
                    <>
                        <PopConfetti />
                        <p>File succesfully uploaded</p>
                    </>
                )}

            </div>
        </div>
    );
};
export default UploadPopup;
