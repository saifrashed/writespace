import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios"
import config from "../config";
import { Badge } from "../types";
import { useNotification } from "./useNotification";

// Custom React hook for managing badge data and actions
function useBadge(token = '', badgeId = '') {
  const [badge, setBadge] = useState<Badge>();
  const { onSuccess, onError } = useNotification();

  // Effect to fetch badge when token changes
  useEffect(() => {
    if (token && badgeId) {
      getBadge(token, badgeId)
    }
  }, [token])


  // Retrieves a badge from the server
  const getBadge = async (token: string, badgeId: string) => {
    try {
      const response = await axios.get(`${config.baseUrl}/badge/get-badge/${badgeId}`, { headers: { bearer: token } });
      setBadge(response.data)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  // Saves the badge on the server
  const saveBadge = async (token: string) => {
    try {

    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  // Updates the experience points for the badge
  const updateExperiencePoints = async (token: string) => {
    try {

    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  // Deletes the badge from the server
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




