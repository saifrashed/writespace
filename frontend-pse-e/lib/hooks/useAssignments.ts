import { useEffect, useState } from "react";
import axios from 'axios';
import config from "../config";
import { Assignment } from "../types";

function useAssigments(courseId: Number) {
  const [assignmentsData, setAssignmentsData] = useState<Assignment[]>([]);

  // Start off making an API call
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // const response = await axios.post('https://writespace.onrender.com/assignments', { courseId: courseId });
        // const response = await axios.get('https://writespace.onrender.com/test/getAll');
        setAssignmentsData([])
      } catch (error) {
        console.log(error)
      }
    };
    fetchAssignments();
  }, [courseId]);


  return { assignments: assignmentsData };
}


export default useAssigments;
