import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { Note, Submission } from "../types";

function useSubmission() {

    const { onSuccess, onError } = useNotification()
    const [submissionData, setSubmissionData] = useState<Submission>();
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    const getSubmission = async (courseId: Number, assignmentId: Number, token: string) => {
      try {
        const responseUser = await axios.post(`${config.baseUrl}/canvas-api/get-user`, { token });
        if (responseUser.data && responseUser.data.id) {
          const responseSubmission = await axios.post(`${config.baseUrl}/canvas-api/courses/${courseId}/${assignmentId}/${responseUser.data.id}`, { token });
          setSubmissionData(responseSubmission.data);
          setIsLoading(false);
        } else {
          onError("Something went wrong");
          throw new Error('Invalid response from get-user endpoint');
        }
      } catch (error) {
        console.log(error);
        onError("Something went wrong");
      }
    };

  return { submission: submissionData, isLoading, getSubmission };

 }


//   const gradeSubmission = async (grade: number, notes: Note[], token: string) => {
//     try {

//     } catch (error) {
//       console.log(error);
//       // onError("Something went wrong");
//     }
//   }

//   const submitSubmission = async () => {
//     try {

//     } catch (error) {
//       console.log(error);
//       // onError("Something went wrong");
//     }
//   }

//   const getSubmissionDocument = async (assignmentId: Number, token: string) => {
//     try {
//       const response = await axios.get("");

//       const data = await response.json();
//       const binaryData = new Uint8Array(data[0].fileData.data);
//       const fileBlob = new Blob([binaryData], { type: 'application/pdf' });
//       const fileUrl = URL.createObjectURL(fileBlob);

//     } catch (error) {
//       console.log(error);
//       // onError("Something went wrong");
//     }
//   };

//   return { submission: submissionData, isLoading, getSubmission, getSubmissionDocument, submitSubmission, gradeSubmission };

//   }

export default useSubmission;
