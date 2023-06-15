import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { Note, Submission } from "../types";

function useSubmission() {
  const { onError } = useNotification()
  const [submissionData, setSubmissionData] = useState<Submission>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileNotes, setFileNotes] = useState<Note[] | null>(null);

  const getSubmission = async (courseId: number, assignmentId: number, token: string) => {
    try {
      const user = await axios.post(`${config.baseUrl}/canvas-api/get-user`, { token });
      const submission = await axios.post(`${config.baseUrl}/canvas-api/courses/${courseId}/${assignmentId}/${user.data.id}`, { token });
      setSubmissionData(submission.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  };

  const gradeSubmission = async (grade: number, notes: Note[], token: string, assignmentId: number) => {
    try {
      // Voor nu nog ff Hardcoded, endpoint wordt vrijdag gefixt
      const userId = 10;
      const assignmentId = 10;
      const body = {
        userId: userId,
        assignmentId: assignmentId,
        grade: grade,
        notes: notes
      }

      const response = await axios.put(`${config.baseUrl}/submission//update/fileNotes/`, body);

      // Correcte versie voor later
      // const body = {
      //   token: token,
      //   assignmentId: assignmentId,
      //   grade: grade,
      //   notes: notes
      // }

      if (response.status === 200) {
        console.log("Grade submitted");
      }
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  const submitSubmission = async (token: string, assignmentId: string, file: File) => {
    try {

      const user = await axios.post(`${config.baseUrl}/canvas-api/get-user`, { token });

      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("userId", user.data.id);
      formData.append("assignmentId", assignmentId);

      const headers = {
        'Content-Type': 'multipart/form-data'
      }

      const response = await axios.post(`${config.baseUrl}/submission/save`, formData, { headers: headers });

      if (response.status === 200) {
        console.log("Submission submitted");
      }
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  const getSubmissionDocument = async (assignmentId: string, token: string) => {
    try {
      // Voor nu nog ff Hardcoded, endpoint wordt vrijdag gefixt
      const user = await axios.post(`${config.baseUrl}/canvas-api/get-user`, { token });
      const response = await axios.get(`${config.baseUrl}/submission/find-specific-submission?userId=${user.data.id}&assignmentId=${assignmentId}`);


      const data = await response.data;

      if (data[0]?.fileData.data) {
        const binaryData = new Uint8Array(data[0].fileData.data);
        const fileBlob = new Blob([binaryData], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(fileBlob);
        const fileNotes = data[0].fileNotes;


        setFileUrl(fileUrl);
        setFileNotes(fileNotes);
      }
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  };

  return { submission: submissionData, isLoading, fileUrl, fileNotes, getSubmission, getSubmissionDocument, submitSubmission, gradeSubmission };

}

export default useSubmission;
