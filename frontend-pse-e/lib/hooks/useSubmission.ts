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

  const gradeSubmission = async (grade: number, notes: Note[], token: string, assignmentId: number) => {
    try {
      // Voor nu nog ff Hardcoded, endpoint wordt vrijdag gefixt
      const userId = "ales1708";
      const assignmentId = "LeukeShit"
      const body = {
        userId: userId,
        assignmentId: assignmentId,
        grade: grade,
        notes: notes
      }

      const response = await axios.put(`${config.backendUrl}/submission//update/fileNotes/`, body);

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

  const submitSubmission = async (token: string, assignmentId: number, file: Buffer) => {
    try {
      const userId = "ales1708";
      const assignmentId = "LeukeShit"

      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("userId", userId);
      formData.append("assignmentId", assignmentId);

      const headers = {
        'Content-Type': 'multipart/form-data'
      }

      // Correcte versie voor later
      // const formData = new FormData();
      // formData.append("file", file, file.name);
      // formData.append("userId", userId);
      // formData.append("assignmentId", assignmentId);

      const response = await axios.post(`${config.backendUrl}/submission/save`, formData, { headers: headers });

      if (response.status === 200) {
        console.log("Submission submitted");
      }
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  const getSubmissionDocument = async (assignmentId: number, token: string) => {
    try {
      // Voor nu nog ff Hardcoded, endpoint wordt vrijdag gefixt
      const userId = "ales1708";
      const assignmentId = "LeukeShit"
      const response = await axios.get(`${config.backendUrl}/submission/findSpecificSubmission?userId=${userId}&assignmentId=${assignmentId}`);

      // Correcte versie voor later
      // const response = await axios.get(`${config.backendUrl}/submission/findSpecificSubmission?token=${token}&assignmentId=${assignmentId}`);

      const data = await response.data;
      const binaryData = new Uint8Array(data[0].fileData.data);
      const fileBlob = new Blob([binaryData], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(fileBlob);
      const fileNotes = data[0].notes;

      setFileUrl(fileUrl);
      setFileNotes(fileNotes);

    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  };

  return { submission: submissionData, isLoading, fileUrl, fileNotes, getSubmission, getSubmissionDocument, submitSubmission, gradeSubmission };

}

export default useSubmission;
