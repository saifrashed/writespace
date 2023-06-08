import { useRouter } from "next/router";
import { setCookie, removeCookie, getCookie } from "./cookie"
import { useEffect, useState } from "react";

/**
 * Custom hook for user authentication.
 * Manages token state and provides login and logout functions.
 * Returns token, login, and logout.
 * @returns Object
 */
function useAuthentication() {
  const router = useRouter();
  const [token, setToken] = useState<any>()

  useEffect(() => {
    if (getCookie("pse-token")) {
      setToken(getCookie("pse-token"))
    }
  }, [])

  const login = async (token: string) => {
    try {
      setCookie("pse-token", token)
      await router.push("/courses");
    } catch (error) {
      console.log(error)
    }
  };

  const logout = async () => {
    try {
      removeCookie("pse-token");
      await router.push("/");
    } catch (error) {
      console.log(error)
    }
  };

  return { token, login, logout };
}

export default useAuthentication;
