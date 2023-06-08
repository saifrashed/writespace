import { useEffect, useState } from "react";
import axios from 'axios';
import config from "../config";
import { Assignment } from "../types";
import { useNotification } from "./useNotification";

function useAssigments(courseId: Number, token: string) {
  const { onSuccess, onError } = useNotification()
  const [assignmentsData, setAssignmentsData] = useState<Assignment[]>([]);

  // Start off making an API call
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.post(`${config.baseUrl}/canvas-api/assignments`, { token, courseId });
        setAssignmentsData(response.data)
      } catch (error) {
        console.log(error)
        onError("Something went wrong")
      }
    };
    fetchAssignments();
  }, [courseId]);


  return { assignments: assignmentsData };
}


export default useAssigments;
