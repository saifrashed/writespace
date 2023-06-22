import axios from "axios"
import config from "../config";
import { useNotification } from "./useNotification";

function useQuizScore(token: string) {
  const { onError } = useNotification();

  const getAllQuizzesScores = async () => {
    try {
      const response = await axios.get(`${config.baseUrl}/quiz-score/get-all`, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  const getAllUserScores = async (userId: number) => {
    try {
      const response = await axios.get(`${config.baseUrl}/quiz-score/user/`, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  const getAllQuizScores = async (quizId: number) => {
    try {
      const response = await axios.get(`${config.baseUrl}/quiz-score/quiz/${quizId}`, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  const getOneScore = async (quizId: number, token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/quiz-score/get-score`, { quizId }, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  const saveQuizScore = async (quizId: string, token: string, latestScore: number) => {
    try {
      const response = await axios.post(`${config.baseUrl}/quiz-score/save`, { quizId, latestScore }, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  const updateQuizScore = async (quizId: number, token: string, latestScore: number) => {
    try {
      const response = await axios.post(`${config.baseUrl}/quiz-score/update/grade`, { quizId, latestScore }, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  return { getAllQuizzesScores, getAllUserScores, getAllQuizScores, getOneScore, saveQuizScore, updateQuizScore };
}

export default useQuizScore;
