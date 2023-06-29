import { useEffect, useState } from "react";
import axios from "axios"
import config from "../config";
import { Badge } from "../types";
import { useNotification } from "./useNotification";

// Custom React hook for managing badge data
function useBadges(token = '') {
  const [badges, setBadges] = useState<Badge[]>([]);
  const { onError } = useNotification();

  // Effect to fetch badges when token changes
  useEffect(() => {
    if (token) {
      getBadges(token)
    }
  })

  // Retrieves badges from the server
  const getBadges = async (token: string) => {
    try {
      const response = await axios.get(`${config.baseUrl}/badge/get-all`, { headers: { bearer: token } });
      setBadges(response.data)
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  return { badges, getBadges };
}

export default useBadges;




