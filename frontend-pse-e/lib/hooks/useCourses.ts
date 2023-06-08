import { useEffect, useState } from "react";
import { Course, courses } from "./dummy"

function useCourses() {
  const [coursesData, setCoursesData] = useState<Course[]>([]);

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
