import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { User } from "../types";

function useUser(token: string) {
  const [user, setUser] = useState<User>();
  const { onSuccess, onError } = useNotification()

  const getUser = async (token: string) => {
    try {
      const response = await axios.post(`${config.baseUrl}/canvas-api/get-user`, { token })
      setUser(response.data);
    } catch (error) {
      console.log(error)
      onError("Something went wrong")
    }
  }

  return { user, getUser };
}

export default useUser;