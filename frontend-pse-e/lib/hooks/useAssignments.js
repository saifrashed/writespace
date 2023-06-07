import { useEffect, useState } from "react";
import { assignments } from "./dummy"
import axios from 'axios';

function useAssigments(courseId) {
  const [assignmentsData, setAssignmentsData] = useState([]);

  // Start off making an API call
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // const response = await axios.post('https://writespace.onrender.com/assignments', { courseId: courseId });
        // const response = await axios.get('https://writespace.onrender.com/test/getAll');
        const filteredAssignments = assignments.filter((assignment) => assignment.course_id == courseId);
        setAssignmentsData(filteredAssignments)
      } catch (error) {
        console.log(error)
      }
    };
    fetchAssignments();
  }, [courseId]);

  // // For any other extra function you want to use
  // const extraFunction = async () => {
  //   try {
  //     return { response: "OK" };
  //   } catch (error) {
  //     console.log(error)
  //     throw error.response.data;
  //   }
  // };

  return { assignments: assignmentsData };
}

export default useAssigments;
