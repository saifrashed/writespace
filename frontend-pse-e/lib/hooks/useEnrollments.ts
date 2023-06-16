import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { Enrollment, Submission } from "../types";

function useEnrollments() {
    const { onSuccess, onError } = useNotification()
    const [enrollmentsData, setEnrollmentsData] = useState<Enrollment[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    const getEnrollments = async (courseId: Number, token: string) => {
      try {
        console.log("hoi")
        // courses/:courseId/enrollments
        // const responseUser = await axios.post(`${config.baseUrl}/canvas-api/get-user`, { token });
        const response = await axios.post(`${config.baseUrl}/canvas-api/courses/${courseId}/enrollments`, { token });
        setEnrollmentsData(response.data);
        setIsLoading(false);
        console.log("test")
      } catch (error) {
        console.log(error);
        onError("Something went wrong");
      }
    };

  return { enrollments: enrollmentsData, isLoading, getEnrollments };

 }

  export default useEnrollments;
