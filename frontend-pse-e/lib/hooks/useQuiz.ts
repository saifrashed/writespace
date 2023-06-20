import axios, { AxiosError } from "axios"
import config from "../config";
import { useState } from 'react';
import { useNotification } from "./useNotification";

function useQuiz(quizId: number) {
  const { onSuccess, onError } = useNotification()
  const [gotQuizzes, setGotQuizzes] = useState(false);
  const [quizzes, setQuizzes] = useState([]);


  const getQuizzes = async () => {
    try {
      const response = await axios.get(`${config.baseUrl}/quiz/get-all`);
      return response.data;
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

  const saveQuiz = async (quizId: number, topic: string, ) => {
    try {
      const response = await axios.get(`${config.baseUrl}/quiz/save`, {quizId, topic, experiencePoints, });
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }



  // const saveQuiz = async (userId: number, quizId: number, latestScore: number) => {
  //   try {
  //     const response = await axios.post(`${config.baseUrl}/quiz-score/save`, {
  //       userId: userId,
  //       quizId: quizId,
  //       latestScore: latestScore
  //     });
  //     return response.data;
  //   } catch (error) {
  //     const axiosError = error as AxiosError;

  //     if (axiosError && axiosError?.response?.status == 409) {
  //       updateQuiz(userId, quizId, latestScore)
  //     }
  //     console.log(error)
  //   }
  // };

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


  return { saveQuiz, getQuiz, gotQuizzes, quizzes };
}

export default useQuiz;
