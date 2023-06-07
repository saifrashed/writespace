import { useEffect, useState } from "react";
import { assignments } from "./dummy"

function useAssigments() {
  const [assignmentsData, setAssignmentsData] = useState([]);

  // Start off making an API call
  useEffect(() => {
    const fetchAssignments = async () => {
      try {

        // API CALL HERE

        setAssignmentsData(assignments)
      } catch (error) {
        console.log(error)
      }
    };
    fetchAssignments();
  }, []);

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
