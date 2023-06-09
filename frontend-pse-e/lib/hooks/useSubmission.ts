import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { Note, Submission } from "../types";

// Custom React hook for managing submission data
function useSubmission(token = '', assignmentId = '', userId = '') {
  const { onError, onSuccess } = useNotification()
  const [submissions, setSubmissions] = useState<Submission[]>();
  const [submission, setSubmission] = useState<Submission>();

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileNotes, setFileNotes] = useState<Note[] | null>(null);
  const [grade, setGrade] = useState<number | null>(0);

  useEffect(() => {
    if (assignmentId && token) {
      getSubmissions(assignmentId, token);
      getSubmission(assignmentId, userId, token);
    }
  }, []);

  // Retrieves all submissions for a specific assignment
  const getSubmissions = async (assignmentId: string, token: string) => {
    try {
      const response = await axios.get(`${config.baseUrl}/submission/get-submissions/${assignmentId}`, { headers: { bearer: token } })
      setSubmissions(response.data)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  // Retrieves a specific submission for an assignment and user
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
        setGrade(response.data[0].grade)
      }

      setSubmission(response.data[0]);
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  };

  // Saves a submission file for an assignment
  const saveSubmission = async (token: string, assignmentId: string, courseId: string, file: File) => {
    try {
      const body = new FormData();

      body.append("file", file, file.name);
      body.append("assignmentId", assignmentId);
      body.append("courseId", courseId);


      const headers = {
        'Content-Type': 'multipart/form-data'
      }

      const response = await axios.post(`${config.baseUrl}/submission/save`, body, { headers: { bearer: token } });

      console.log(response)

      onSuccess("File submitted")
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  // Grades a submission for an assignment and user
  const gradeSubmission = async (token: string, grade: number, notes: Note[], assignmentId: string, userId: string, courseId: string) => {
    try {
      const body = {
        userId: userId,
        assignmentId: assignmentId,
        grade: grade,
        notes: notes,
        courseId: courseId
      }

      const response = await axios.put(`${config.baseUrl}/submission/grade/`, body, { headers: { bearer: token } });

      onSuccess("Grade submitted")
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  const addReply = async (token: string, assignmentId: number, message: string, noteId: number, studentId: string, date: string) => {
    try {
      const body = {
        assignmentId: assignmentId,
        noteId: noteId,
        message: message,
        studentId: studentId,
        date: date
      }

      const response = await axios.put(`${config.baseUrl}/submission/add-reply/`, body, { headers: { bearer: token } });

      console.log(response)

      onSuccess("Reply submitted")
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  return { submission, submissions, isLoading, fileUrl, fileNotes, grade, getSubmissions, getSubmission, saveSubmission, gradeSubmission, addReply };
}

export default useSubmission;
