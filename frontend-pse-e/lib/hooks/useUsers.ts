import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { User } from "../types";

function useUsers() {
    const { onSuccess, onError } = useNotification()
    const [usersData, setUsersData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    const getAllUsers = async (token: string) => {
      try {
          const response = await axios.get(`${config.baseUrl}/user/get-all`, { headers : { bearer: token }});
          return response.data;
      } catch (error) {
          console.log(error)
          onError("Something went wrong")
      }
    }

  return { users: usersData, isLoading, getAllUsers };

 }

  export default useUsers;
