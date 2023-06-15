import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNotification } from "./useNotification";
import { User } from "../types";

function useUsers() {
    const { onSuccess, onError } = useNotification()
    const [usersData, setUsersData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    const getUsers = async (courseId: Number, token: string) => {
      try {
        // const responseUser = await axios.post(`${config.baseUrl}/canvas-api/get-user`, { token });
          const response = await axios.post(`${config.baseUrl}/canvas-api/courses/${courseId}/users`, { token });
          setUsersData(response.data);
          setIsLoading(false);
      } catch (error) {
        console.log(error);
        onError("Something went wrong");
      }
    };

  return { users: usersData, isLoading, getUsers };

 }

  export default useUsers;
