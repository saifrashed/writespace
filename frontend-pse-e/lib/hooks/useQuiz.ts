import axios, { AxiosError } from "axios"
import config from "../config";
import { useState } from 'react';

function useQuiz() {
  const [gotQuizzes, setGotQuizzes] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  const saveQuiz = async (userId: number, quizId: number, latestScore: number) => {
    try {
      const response = await axios.post(`${config.baseUrl}/quiz-score/save`, {
        userId: userId,
        quizId: quizId,
        latestScore: latestScore
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError && axiosError?.response?.status == 409) {
        updateQuiz(userId, quizId, latestScore)
      }
      console.log(error)
    }
  };

  const updateQuiz = async (userId: number, quizId: number, latestScore: number) => {
    try {
      const response = await axios.put(`${config.baseUrl}/quiz-score/update/grade`, {
        userId: userId,
        quizId: quizId,
        latestScore: latestScore
      });

      return response.data;
    } catch (error) {
      console.log(error)
    }
  };

  const getQuiz = async (userId: number) => {
    try {
      const response = await axios.get(`${config.baseUrl}/quiz-score/find-by-user-id/${userId}`);
      setGotQuizzes(true);
      setQuizzes(response.data)
    } catch (error) {
      console.log(error);
    }
  }


  return { saveQuiz, getQuiz, gotQuizzes, quizzes };
}

export default useQuiz;
