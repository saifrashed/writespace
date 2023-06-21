import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { Note, Submission } from "../types";

function useSubmission(token = '', courseId = '', assignmentId = '') {
  const { onError, onSuccess } = useNotification()
  const [submissionData, setSubmissionData] = useState<Submission>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileNotes, setFileNotes] = useState<Note[] | null>(null);
  const [grade, setGrade] = useState<number | null>(0);

  useEffect(() => {
    if (courseId && token && assignmentId) {

    }
  }, []);


  const saveSubmission = async (token: string, assignmentId: string, file: File) => {
    try {

      const body = new FormData();

      body.append("file", file, file.name);
      body.append("assignmentId", assignmentId);

      const headers = {
        'Content-Type': 'multipart/form-data'
      }

      const response = await axios.post(`${config.baseUrl}/submission/save`, body, { headers: headers });

      onSuccess("File submitted")

    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  const addNotesToSubmission = async (courseId: string, assignmentId: string, token: string) => {
    try {

    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }


  const gradeSubmission = async (courseId: string, assignmentId: string, token: string) => {
    try {

    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }


  const updateSubmission = async (courseId: string, assignmentId: string, token: string) => {
    try {

    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }



  return { submission: submissionData, isLoading, fileUrl, fileNotes, grade };

}

export default useSubmission;






// const gradeSubmission = async (grade: number, notes: Note[], token: string, assignmentId: number) => {
//   try {
//     // // Voor nu nog ff Hardcoded, endpoint wordt vrijdag gefixt
//     // const userId = 10;
//     // const assignmentId = 10;
//     // const body = {
//     //   userId: userId,
//     //   assignmentId: assignmentId,
//     //   grade: grade,
//     //   notes: notes
//     // }

//     const user = await axios.post(`${config.baseUrl}/canvas-api/get-user`, { token });

//     // Correcte versie voor later
//     const body = {
//       userId: user.data.id,
//       assignmentId: assignmentId,
//       grade: grade,
//       notes: notes
//     }

//     const response = await axios.put(`${config.baseUrl}/submission/update/fileNotes/`, body);


//     // console.log(response)
//     // console.log(body)

//     if (response.status === 200) {
//       console.log("Grade submitted");
//     }
//   } catch (error) {
//     console.log(error);
//     onError("Something went wrong");
//   }
// }

// const submitSubmission = async (token: string, assignmentId: string, file: File) => {
//   try {
//     const user = await axios.post(`${config.baseUrl}/canvas-api/get-user`, { token });
//     const formData = new FormData();

//     formData.append("file", file, file.name);
//     formData.append("userId", user.data.id);
//     formData.append("assignmentId", assignmentId);

//     const headers = {
//       'Content-Type': 'multipart/form-data'
//     }

//     const response = await axios.post(`${config.baseUrl}/submission/save`, formData, { headers: headers });

//     if (response.status === 200) {
//       console.log("Submission submitted");
//     }
//   } catch (error) {
//     console.log(error);
//     onError("Something went wrong");
//   }
// }

// const getSubmissionDocument = async (assignmentId: string, token: string) => {
//   try {
//     // Voor nu nog ff Hardcoded, endpoint wordt vrijdag gefixt
//     const user = await axios.post(`${config.baseUrl}/canvas-api/get-user`, { token });
//     const response = await axios.get(`${config.baseUrl}/submission/find-specific-submission?userId=${user.data.id}&assignmentId=${assignmentId}`);


//     const data = await response.data;

//     if (data[0]?.fileData.data) {
//       const binaryData = new Uint8Array(data[0].fileData.data);
//       const fileBlob = new Blob([binaryData], { type: 'application/pdf' });
//       const fileUrl = URL.createObjectURL(fileBlob);
//       const fileNotes = data[0].fileNotes;


//       setFileUrl(fileUrl);
//       setFileNotes(fileNotes);
//       setGrade(data[0].submissionGrade)
//     }
//   } catch (error) {
//     console.log(error);
//     onError("Something went wrong");
//   }
// };
