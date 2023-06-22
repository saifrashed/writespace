import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios"
import config from "../config";
import { Badge } from "../types";
import { useNotification } from "./useNotification";

function useBadge(token = '', badgeId = '') {
  const [badge, setBadge] = useState<Badge>();
  const { onSuccess, onError } = useNotification();

  useEffect(() => {
    if (token && badgeId) {
      getBadge(token, badgeId)
    }
  }, [token])

  const getBadge = async (token: string, badgeId: string) => {
    try {
      const response = await axios.get(`${config.baseUrl}/badge/get-badge/${badgeId}`, { headers: { bearer: token } });
      setBadge(response.data)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  const saveBadge = async (token: string) => {
    try {

    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  const updateExperiencePoints = async (token: string) => {
    try {

    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  const deleteBadge = async (token: string) => {
    try {

    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  return { badge, getBadge };
}

export default useBadge;




