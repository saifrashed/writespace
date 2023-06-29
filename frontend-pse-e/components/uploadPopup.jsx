import React, { useEffect, useState } from "react";
import PopConfetti from './popConfetti';
import useSubmission from "@/lib/hooks/useSubmission";
import useAuthentication from "@/lib/hooks/useAuthentication";
import Lottie from "lottie-react"
import * as submittedAnimationData from "@/public/animations/greenTick.json";
import { useNotification } from "@/lib/hooks/useNotification";
import useUser from "@/lib/hooks/useUser";
import { useRouter } from "next/router";

const UploadPopup = ({ showPopup, togglePopup, deadline }) => {
    const router = useRouter();

    const { courseId, assignmentId } = router.query;

    const [fileUploadSuccess, setFileUploadSuccess] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false)
    const fileSizeLimit = 1 * 1048576;  // 1MB
    const { saveSubmission } = useSubmission()
    const { token } = useAuthentication()
    const { onError } = useNotification()
    const { addUserBadges, user } = useUser(token)
    const { onSuccess } = useNotification()

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
        const file = event.target.files[0];

        setFileUploadSuccess(false);

        // Security measure: sanitize metadata.
        const sanitizedFileType = sanitizeString(file.type);
        const sanitizedFileName = sanitizeString(file.name);
        console.log(file)

        if (!file) {
            setUploadedFile(null);
            onError("Something went wrong: No file uploaded.")
            return;
        }

        // Security measure: Only accept pdf's.
        // Normally application/pdf, applicationpdf is sanitized version
        if (sanitizedFileType !== "applicationpdf") {
            event.target.value = null;  // Reset the file input.
            setUploadedFile(null);
            onError("Only .pdf files allowed.")
            return;

        }
        // Security measure (against DoS): Max. file size
        if (file.size > fileSizeLimit) {
            event.target.value = null;
            setUploadedFile(null);
            onError("File size exceeds the limit.")
            return;
        }

        // Valid upload.
        setUploadedFile({
            name: sanitizedFileName,
            file: file,
            size: file.size  // To show some functionality.
        });
    };

    function isBadgePresent(badgeId) {
        return user?.badges.some(badge => (badge.badgeId === badgeId && badge.courseId === parseInt(courseId) && badge.assignmentId === parseInt(assignmentId)));
    }

    const handleSubmit = () => {
        const currentTime = new Date();
        const currentDate = currentTime.toISOString();

        if (deadline === null || currentDate < deadline) {
            if (!isConfirmed) {
                onError("Please confirm that the work submitted is your own.")
                return;
            }

            if (!uploadedFile) {
                onError("Please upload a file.")
                return;
            }

            if (!isBadgePresent(13)) {
                addUserBadges([13], courseId, assignmentId, "", "", token)
                onSuccess("Congratulations you have received a badge! View your profile to see it.")
            }

            saveSubmission(token, assignmentId, courseId, uploadedFile.file)
            setFileUploadSuccess(true);
        }

        else {
            onError("The deadline has passed. Submission is not possible.")
        }
    }

    const handleCloseModal = () => {
        togglePopup();
        setUploadedFile(null);  // Reset to show no metadata on next popup open.
        setIsConfirmed(false);
        setFileUploadSuccess(false);
    }

    if (!showPopup) {
        return null;
    }

    return (
        <>
            <div tabIndex={-1} className={"backdrop-blur-[6px] fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full "} >
                <div className="relative w-full max-w-md max-h-full mx-auto">
                    <div className="relative bg-white rounded-lg shadow ">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="popup-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" onClick={handleCloseModal} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                            {/* If student has not submitted the grade */}
                            {!fileUploadSuccess && (
                                <>
                                    <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>

                                    <h3 className="mb-5 text-lg font-normal text-gray-500 ">Submit your assignment</h3>
                                    {/* File select browse button.*/}
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 1 MB)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" onChange={(event) => { handleInputChange(event); }} className="hidden" />
                                        </label>
                                    </div>
                                    {/* No plagiarism confirmation checkbox */}
                                    <div className="flex items-center my-4">
                                        <input id="default-checkbox" type="checkbox" value={isConfirmed} checked={isConfirmed}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                            onChange={(event) => {
                                                setIsConfirmed(event.target.checked);
                                            }} />
                                        <label
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            I confirm the submitted work is my own.
                                        </label>
                                    </div>
                                    {/* To show name sanitize functionality. */}
                                    {uploadedFile && (  // Show metadata.
                                        <div className="my-3">
                                            <p>Sanitized filename: {uploadedFile.name}</p>
                                            <p>File size: {uploadedFile.size / 1000} kbytes</p>
                                        </div>
                                    )}
                                    <button data-modal-hide="popup-modal" onClick={() => {
                                        handleSubmit()
                                    }} type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Yes, I&apos;m sure
                                    </button>

                                    <button data-modal-hide="popup-modal" onClick={handleCloseModal} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">No, cancel</button>
                                </>
                            )}

                            {/* If student submitted the grade */}
                            {fileUploadSuccess && (
                                <>
                                    <div className="w-full mx-auto text-center">
                                        <Lottie
                                            loop={false}
                                            autoplay={true}
                                            animationData={submittedAnimationData}
                                        />
                                        <PopConfetti />
                                        <button
                                            onClick={handleCloseModal}
                                            className="px-4 py-2 mr-2 inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 text-lg font-medium rounded-full">
                                            Close
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default UploadPopup;


