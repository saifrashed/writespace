import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { Note, Submission } from "../types";

function useSubmission(token = '', assignmentId = '', userId = '') {
  const { onError, onSuccess } = useNotification()
  const [submissions, setSubmissions] = useState<Submission[]>();
  const [submission, setSubmission] = useState<Submission>();

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileNotes, setFileNotes] = useState<Note[] | null>(null);
  const [grade, setGrade] = useState<number | null>(0);

  useEffect(() => {
    if (userId && token && assignmentId) {

    }
  }, []);

  useEffect(() => {
    if (assignmentId && token) {
      getSubmissions(assignmentId, token);
      getSubmission(assignmentId, userId, token);
    }
  }, [assignmentId]);

  const getSubmissions = async (assignmentId: string, token: string) => {
    try {
      const response = await axios.get(`${config.baseUrl}/submission/get-submissions/${assignmentId}`, { headers: { bearer: token } })
      setSubmissions(response.data)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  const getSubmission = async (assignmentId: string, userId: string = '', token: string) => {
    try {

      let response;

      if (userId) {
        response = await axios.post(`${config.baseUrl}/submission/get-submission`, { assignmentId, userId }, { headers: { bearer: token } });
      } else {
        response = await axios.post(`${config.baseUrl}/submission/get-submission`, { assignmentId }, { headers: { bearer: token } });
      }


      if (response.data[0]?.fileData.data) {
        const binaryData = new Uint8Array(response.data[0].fileData.data);
        const fileBlob = new Blob([binaryData], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(fileBlob);
        const fileNotes = response.data[0].fileNotes;


        setFileUrl(fileUrl);
        setFileNotes(fileNotes);
        setGrade(response.data[0].submissionGrade)
      }

      console.log(response.data)

      setSubmission(response.data);
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  };

  const saveSubmission = async (token: string, assignmentId: string, file: File) => {
    try {

      const body = new FormData();

      body.append("file", file, file.name);
      body.append("assignmentId", assignmentId);

      const headers = {
        'Content-Type': 'multipart/form-data'
      }

      const response = await axios.post(`${config.baseUrl}/submission/save`, body, { headers: { bearer: token } });

      onSuccess("File submitted")

    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  const gradeSubmission = async (token: string, grade: number, notes: Note[], assignmentId: number, userId: number) => {
    try {
      const body = {
        userId: userId,
        assignmentId: assignmentId,
        grade: grade,
        notes: notes
      }

      const response = await axios.put(`${config.baseUrl}/submission/grade/`, body, { headers: { bearer: token } });

      onSuccess("Grade submitted")

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



  return { submission, submissions, isLoading, fileUrl, fileNotes, grade, getSubmissions, getSubmission, saveSubmission, gradeSubmission, updateSubmission };

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
