import { useContext, useEffect, useState } from "react";
import config from "../config";
import { Course } from "../types";
import axios from 'axios'
import { useNotification } from "./useNotification";
import { Context } from "@/Context";

// Custom React hook for managing courses data
function useCourses(token = '') {
  const { onSuccess, onError } = useNotification()
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const { setCourses } = useContext(Context);

  useEffect(() => {
    // Fetch courses data when token changes
    if (token) {
      getCourses(token);
    }
  }, [])

  // Retrieves courses data from the server
  const getCourses = async (token: string) => {
    try {
      const response = await axios.get(`${config.baseUrl}/course/get-all`, { headers: { bearer: token } });
      setCoursesData(response.data)
      setCourses(response.data)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  return { courses: coursesData, getCourses };
}

export default useCourses;