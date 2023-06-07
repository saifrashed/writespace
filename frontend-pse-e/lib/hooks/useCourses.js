import { useEffect, useState } from "react";
import { courses } from "./dummy"

function useCourses() {
  const [coursesData, setCoursesData] = useState([]);

  // Start off making an API call
  useEffect(() => {
    const fetchCourses = async () => {
      try {

        // API CALL HERE

        setCoursesData(courses)
      } catch (error) {
        console.log(error)
      }
    };
    fetchCourses();
  }, []);

  // For any other extra function you want to export
  const updateCourse = async () => {
    console.log("UPDATED COURSE")
  };

  return { courses: coursesData, updateCourse };
}

export default useCourses;
