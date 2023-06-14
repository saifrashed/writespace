/**
 * This is an example hook that can be used to create new API
 * interfaces for any kind of datatype (courses, assignments, user
 * and more...)
 */

import { useEffect, useState } from "react";
import axios from "axios"
import config from "../config";

function useQuiz() {
  const [example, setExample] = useState({});


  const saveQuiz = async (userId: number, quizId: number, latestScore: number) => {
    try {
      const response = await axios.post(`${config.baseUrl}/quizScore/save`, {
        userId: userId,
        quizId: String(quizId),
        latestScore: latestScore
      });

      return response.data;
    } catch (error) {
      console.log(error)
    }
  };

  const updateQuiz = async (userId: number, quizId: number, latestScore: number) => {
    try {
      const response = await axios.put(`${config.baseUrl}/quizScore/update/grade/`, {
        userId: userId,
        quizId: String(quizId),
        latestScore: latestScore
      });

      return response.data;
    } catch (error) {
      console.log(error)
    }
  };


  return { data: example, saveQuiz };
}

export default useQuiz;
