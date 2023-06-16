import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { Submission } from "../types";

function useSubmissions() {
    const { onSuccess, onError } = useNotification()
    const [submissionsData, setSubmissionsData] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    const getSubmissions = async (courseId: Number, assignmentId: Number, token: string) => {
      try {
        // const responseUser = await axios.post(`${config.baseUrl}/canvas-api/get-user`, { token });
          const response = await axios.post(`${config.baseUrl}/canvas-api/courses/${courseId}/assignments/${assignmentId}/submissions`, { token });
          setSubmissionsData(response.data);
          setIsLoading(false);
      } catch (error) {
        console.log(error);
        onError("Something went wrong");
      }
    };

  return { submissions: submissionsData, isLoading, getSubmissions };

 }

  export default useSubmissions;
