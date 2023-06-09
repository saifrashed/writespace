import { useEffect, useState } from "react";
import axios from 'axios';
import config from "../config";
import { Assignment } from "../types";
import { useNotification } from "./useNotification";

function useAssigments() {
  const { onSuccess, onError } = useNotification()
  const [assignmentsData, setAssignmentsData] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const getAssignments = async (courseId: Number, token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/canvas-api/assignments`, { token, courseId });
      setAssignmentsData(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }


  return { assignments: assignmentsData, isLoading, getAssignments };
}


export default useAssigments;
