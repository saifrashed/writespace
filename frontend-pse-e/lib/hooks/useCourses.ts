import { useEffect, useState } from "react";
import config from "../config";
import { Course } from "../types";

function useCourses() {
  const [coursesData, setCoursesData] = useState<Course[]>([]);

  // Start off making an API call
  useEffect(() => {
    const fetchCourses = async () => {
      try {

        // API CALL HERE

        setCoursesData([])
      } catch (error) {
        console.log(error)
      }
    };
    fetchCourses();
  }, []);

  return { courses: coursesData };
}

export default useCourses;
