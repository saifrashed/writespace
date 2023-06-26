import axios from "axios";
import config from "../config";
import { useNotification } from "./useNotification";

// Custom React hook for managing quiz scores
function useQuizScore(token: string) {
  const { onError } = useNotification();

  // Retrieves all quiz scores
  const getAllQuizzesScores = async () => {
    try {
      const response = await axios.get(`${config.baseUrl}/quiz-score/get-all`, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  // Retrieves all scores for a specific user
  const getAllUserScores = async (token: string) => {
    try {
      const response = await axios.get(`${config.baseUrl}/quiz-score/user/`, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  // Retrieves all scores for a specific quiz
  const getAllQuizScores = async (quizId: number) => {
    try {
      const response = await axios.get(`${config.baseUrl}/quiz-score/quiz/${quizId}`, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  // Retrieves a single score for a specific quiz
  const getOneScore = async (quizId: number, token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/quiz-score/get-score`, { quizId }, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  // Saves a quiz score
  const saveQuizScore = async (quizId: string, token: string, latestScore: number) => {
    try {
      const response = await axios.post(`${config.baseUrl}/quiz-score/save`, { quizId, latestScore }, { headers: { bearer: token } });
      return response.data;
    } catch (error) {
      console.log(error);
      onError("Something went wrong");
    }
  }

  return { getAllQuizzesScores, getAllUserScores, getAllQuizScores, getOneScore, saveQuizScore};
}

export default useQuizScore;
