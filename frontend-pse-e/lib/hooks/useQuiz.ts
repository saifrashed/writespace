import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios"
import config from "../config";

function useQuiz() {

  const saveQuiz = async (userId: number, quizId: number, latestScore: number) => {
    try {
      const response = await axios.post(`${config.baseUrl}/quiz-score/save`, {
        userId: userId,
        quizId: quizId,
        latestScore: latestScore
      });
      console.log(response)
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


  return { saveQuiz };
}

export default useQuiz;





  // const saveQuiz = async (userId) => {

  //   try {
  //     console.log(result.correctAnswers)
  //     const response = await axios.post('http://localhost:5000/quizScore/save', {
  //       userId: userId,
  //       quizId: String(quizId.quizId),
  //       latestScore: result.correctAnswers
  //     });
  //     console.log(response.data); // Handle the response data
  //   } catch (error) {
  //     if (error.response.status == 409) {
  //       try {
  //         const response = await axios.put('http://localhost:5000/quizScore/update/grade/', {
  //           userId: userId,
  //           quizId: String(quizId.quizId),
  //           latestScore: result.correctAnswers
  //         });
  //         console.log(response.data); // Handle the response data
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //     console.error(error); // Handle the error
  //   }
  // }
