import { useRouter } from "next/router";
import { setCookie, removeCookie, getCookie } from "../cookie"
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import config from "../config";
import { TokenResponse } from "../types";
import { useNotification } from "./useNotification";

// Custom React hook for handling authentication related functionality
function useAuthentication() {
  const router = useRouter();
  const { onSuccess } = useNotification()
  const [token, setToken] = useState<any>(getCookie("pse-token"))

  // Log in user with the provided code
  const login = async (code: string) => {
    try {
      const response: AxiosResponse<TokenResponse> = await axios.post<TokenResponse>(`${config.baseUrl}/auth/get-user-token`, { code: code });
      const user = await axios.get(`${config.baseUrl}/user/get-user`, { headers: { bearer: response.data.access_token } });

      if (!user.data.userId) {
        await axios.post(`${config.baseUrl}/user/save`, { badges: [] }, { headers: { bearer: response.data.access_token } });
      }
      setCookie("pse-token", response.data.access_token)
      setCookie("pse-refresh-token", response.data.refresh_token)
      setToken(response.data.access_token)
      onSuccess("Authentication successful")
    } catch (error) {
      console.log(error)
    }
  };

  // Log out the user
  const logout = async () => {
    try {
      removeCookie("pse-token");
      removeCookie("pse-refresh-token");
      await router.push("/");
    } catch (error) {
      console.log(error)
    }
  };


  return { token, login, logout };
}

export default useAuthentication;
