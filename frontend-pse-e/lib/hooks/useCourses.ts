import { useEffect, useState } from "react";
import config from "../config";
import { Course } from "../types";
import axios from 'axios'
import { useNotification } from "./useNotification";

function useCourses(token: string) {
  const { onSuccess, onError } = useNotification()
  const [coursesData, setCoursesData] = useState<Course[]>([]);

  // Start off making an API call
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.post(`${config.baseUrl}/canvas-api/courses`, { token: token });
        setCoursesData(response.data)
      } catch (error) {
        console.log(error)
        onError("Something went wrong")
      }
    };
    fetchCourses();
  }, []);

  return { courses: coursesData };
}

export default useCourses;
