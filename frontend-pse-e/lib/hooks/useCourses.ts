import { useContext, useEffect, useState } from "react";
import config from "../config";
import { Course } from "../types";
import axios from 'axios'
import { useNotification } from "./useNotification";
import { Context } from "@/Context";

function useCourses() {
  const { onSuccess, onError } = useNotification()
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const { setCourses } = useContext(Context);

  const getCourses = async (token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/canvas-api/courses`, { token: token });
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