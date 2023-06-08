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

  return { assignment, getAssignment };
}

export default useAssignment;
