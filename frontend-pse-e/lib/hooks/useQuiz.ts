import axios, { AxiosError } from "axios"
import config from "../config";
import { useState, useEffect } from 'react';
import { useNotification } from "./useNotification";

function useQuiz(token = '') {
  const { onError } = useNotification()
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (token) {
      getQuizzes();
    }
  }, [token]);

  const getQuizzes = async () => {
    try {
      const response = await axios.get(`${config.baseUrl}/quiz/get-all`, { headers: { bearer: token } });
      console.log(response.data);
      setQuizzes(response.data);
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  const getQuiz = async (quizId: number) => {
    try {
      const response = await axios.get(`${config.baseUrl}/quiz/get-quiz/${quizId}`,);
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  return { quizzes, getQuizzes, getQuiz };
}

export default useQuiz;
