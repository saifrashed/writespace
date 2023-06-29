import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { Assignment } from "../types";

// Custom React hook for managing assignment data and actions
function useAssignment(token = '', courseId = '', assignmentId = '') {
  const [assignment, setAssignment] = useState<Assignment>();
  const { onSuccess, onError } = useNotification();

  // Effect to fetch assignments when courseId or token changes
  useEffect(() => {
    if (assignmentId && token && courseId) {
      getAssignment(courseId, assignmentId, token);
    }
  });

  // Retrieves an assignment from the server
  const getAssignment = async (courseId: string, assignmentId: string, token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/assignment/get-one`, { courseId, assignmentId }, { headers: { bearer: token } })
      setAssignment(response.data);
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  // Creates a new assignment on the server
  const createAssignment = async (courseId: string, assignment: any, token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/assignment/create`, { courseId, assignment }, { headers: { bearer: token } })
      setAssignment(response.data)
      onSuccess(`Succesfully created "${assignment?.name}"`)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  // Updates an existing assignment on the server
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

  const deleteAssignment = async (courseId: string, assignmentId: string, token: string) => {
    try {
      const response = await axios.delete(`${config.baseUrl}/assignment/delete/${courseId}/${assignmentId}`,
        {
          headers: {
            bearer: token,
          },
        }
      );
      onSuccess(`Succesfully deleted "${response.data.name}"`)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  return { assignment, getAssignment, createAssignment, updateAssignment, deleteAssignment };
}

export default useAssignment;
