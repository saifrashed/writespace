/**
 * This is an example hook that can be used to create new API
 * interfaces for any kind of datatype (courses, assignments, user
 * and more...)
 */

import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";

function useAssignment(courseId: number, assignmentId: number, token: string) {
  const [assignment, setAssignment] = useState({});
  const { onSuccess, onError } = useNotification()

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.post(`${config.baseUrl}/canvas-api/courses/${courseId}/${assignmentId}`, { token })
        setAssignment(response.data)
      } catch (error) {
        console.log(error)
        onError("Something went wrong")
      }
    };
    fetchAssignment();
  }, []);

  return { assignment: assignment };
}

export default useAssignment;
