import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { Assignment } from "../types";

function useAssignment() {
  const [assignment, setAssignment] = useState<Assignment>();
  const { onSuccess, onError } = useNotification()

  const getAssignment = async (courseId: number, assignmentId: number, token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/canvas-api/courses/${courseId}/${assignmentId}`, { token })
      setAssignment(response.data)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }
  const createAssignment = async (courseId: number, assignment: Assignment, token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/canvas-api/courses/${courseId}/assignments`, { token, assignment })
      setAssignment(response.data)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }
  const updateAssignment = async (courseId: number, assignmentId: number, assignment: Assignment, token: string) => {
    try {
      const response = await axios.put(`${config.baseUrl}/canvas-api/courses/${courseId}/assignments/${assignmentId}`, { token, assignment })
      console.log(response.data);

      setAssignment(response.data)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }



  return { assignment, getAssignment, createAssignment, updateAssignment };
}

export default useAssignment;
