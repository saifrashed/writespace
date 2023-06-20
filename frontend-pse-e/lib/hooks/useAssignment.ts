import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { Assignment, Submission } from "../types";

function useAssignment(token = '', courseId = '', assignmentId = '') {
  const [assignment, setAssignment] = useState<Assignment>();
  const { onSuccess, onError } = useNotification();
  const [submissions, setSubmissions] = useState<Submission[]>();
  const [submission, setSubmission] = useState<Submission>();

  useEffect(() => {
    if (assignmentId && token) {
      getSubmissions(assignmentId, token);
      getSubmission(assignmentId, token);
      if (courseId) {
        getAssignment(courseId, assignmentId, token);
      }
    }
  }, [courseId, assignmentId]);

  const getAssignment = async (courseId: string, assignmentId: string, token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/assignment/get-one`, { courseId, assignmentId }, { headers: { bearer: token } })
      setAssignment(response.data);
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  const createAssignment = async (courseId: string, assignment: Assignment, token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/assignment/create`, { courseId, assignment }, { headers: { bearer: token } })
      setAssignment(response.data)
      onSuccess(`Succesfully created "${assignment?.name}"`)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  const updateAssignment = async (courseId: string, assignmentId: string, assignment: Assignment, token: string) => {
    try {
      const response = await axios.put(`${config.baseUrl}/assignment/update`, { assignment, assignmentId, courseId }, { headers: { bearer: token } })
      setAssignment(response.data)
      onSuccess(`Succesfully updated "${assignment?.name}"`)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  const getSubmissions = async (assignmentId: string, token: string) => {
    try {
      const response = await axios.get(`${config.baseUrl}/assignment/get-submissions/${assignmentId}`, { headers: { bearer: token } })
      setSubmissions(response.data)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  const getSubmission = async (assignmentId: string, token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/assignment/get-submission`, { assignmentId }, { headers : { bearer: token }});
      setSubmission(response.data);
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  };

  return { assignment, submission, submissions, getAssignment, createAssignment, updateAssignment, getSubmissions, getSubmission };
}

export default useAssignment;
