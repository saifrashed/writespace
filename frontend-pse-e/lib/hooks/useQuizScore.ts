import axios, { AxiosError } from "axios"
import config from "../config";
import { useState } from 'react';
import { useNotification } from "./useNotification";

function useQuizScore(quizId: number) {
    const { onSuccess, onError } = useNotification();


    const getQuizzes = async () => {
        try {
          const response = await axios.get(`${config.baseUrl}/quiz-/get-all`);
          return response.data;
        } catch (error) {
          console.log(error);
          onError("Something went wrong");
        }
      }

    return {};
}

export default useQuizScore;
