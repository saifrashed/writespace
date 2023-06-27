import axios, { AxiosError } from "axios"
import config from "../config";
import { useState, useEffect } from 'react';
import { useNotification } from "./useNotification";

// Custom React hook for managing quiz data
function useQuiz(token = '') {
  const { onError } = useNotification()
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch quizzes when token changes
    if (token) {
      getQuizzes();
    }
  }, [token]);

  // Retrieves quizzes from the server
  const getQuizzes = async () => {
    try {
      const response = await axios.get(`${config.baseUrl}/quiz/get-all`, { headers: { bearer: token } });
      setQuizzes(response.data);
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  // Retrieves a specific quiz from the server
  const getQuiz = async (quizId: number) => {
    try {
      const response = await axios.get(`${config.baseUrl}/quiz/get-quiz/${quizId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  return { quizzes, getQuizzes, getQuiz };
}

export default useQuiz;
