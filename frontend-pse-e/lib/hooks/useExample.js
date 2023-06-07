import { useEffect, useState } from "react";

function useExample() {
  const [example, setExample] = useState({});

  useEffect(() => {
    const fetchExample = async () => {
      try {



      } catch (error) {
        console.log(error)
      }
    };
    fetchExample();
  }, []);


  const extraFunction = async () => {
    try {
      return { response: "OK" };
    } catch (error) {
      console.log(error)
      throw error.response.data;
    }
  };
  return { data: example, extraFunction };
}

export default useExample;
