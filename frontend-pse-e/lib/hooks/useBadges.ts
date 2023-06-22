import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios"
import config from "../config";
import { Badge } from "../types";
import { useNotification } from "./useNotification";

function useBadges(token = '') {
  const [badges, setBadges] = useState<Badge[]>([]);
  const { onSuccess, onError } = useNotification();

  useEffect(() => {
    if (token) {
      getBadges(token)
    }
  }, [token])

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




