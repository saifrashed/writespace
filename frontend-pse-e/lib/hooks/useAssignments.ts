import { useEffect, useState } from "react";
import axios from 'axios';
import config from "../config";
import { Assignment } from "../types";
import { useNotification } from "./useNotification";


// Custom React hook for managing assignment data and fetching assignments
function useAssignments(courseId = '', role = '', token = '') {
  const { onSuccess, onError } = useNotification()
  const [assignmentsData, setAssignmentsData] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  // Effect to fetch assignments when courseId or token changes
  useEffect(() => {
    if (courseId && token) {
      getAssignments(courseId?.toString(), (role === 'teacher'), token);
    }
  }, [courseId]);


  // Fetches assignments from the server
  const getAssignments = async (courseId: String, isTeacher: boolean, token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/assignment/get-all`, { isTeacher, courseId }, { headers: { bearer: token } });
      setAssignmentsData(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }
  return { assignments: assignmentsData, isLoading, getAssignments };
}

export default useAssignments;