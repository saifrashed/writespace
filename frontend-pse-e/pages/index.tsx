
import Head from "next/head";
import 'tailwindcss/tailwind.css';
import NavBar from "@/components/NavBar"
import { useEffect, useState } from "react";
import useAuthentication from "@/lib/hooks/useAuthentication"
import { useRouter } from 'next/router';
import config from "@/lib/config";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token, login } = useAuthentication();
  const router = useRouter()

  /**
   * Navigate to courses if user is logged in.
   */
  useEffect(() => {
    if (token) {
      setIsLoading(true); // Set loading state to true when token is available.
      router.push("/courses")
    }
  }, [token])

  /**
   * Check for login code
   */
  useEffect(() => {
    const { code } = router.query;
    if (code && typeof code === 'string') {
      setIsLoading(true); // Set loading state to true when token is available.
      // Do something with the extracted code.
      login(code)
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>WriteSpace</title>
        <meta name="description" content="Writing. Fun, Intuitive." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <NavBar showLogout={false} />

      {isLoading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-sky-500 border-8 h-14 w-14"></div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <section className="bg-white overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
              <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
                <div className="absolute bottom-0 right-0 hidden lg:block">
                  <img className="object-contain w-auto h-48" src="./curved-lines.png" alt="" />
                </div>
                <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
                  <h1 className="text-4xl font-bold text-black sm:text-6xl xl:text-8xl">
                    Writing.<br />
                    Fun, Engaging.
                  </h1>
                  <p className="mt-8 text-xl text-black">Try our dynamic gamified platform and transform studying into an engaging and rewarding experience.</p>
                  <br />
                  <a href={`${config.baseUrl}/auth/login`} className="bg-sky-300 hover:bg-sky-400 text-center text-white transition-all font-bold py-2 px-4 border-b-8 border-sky-500 hover:border-sky-500 rounded-lg  items-center mt-4">
                    Log in via institution
                  </a>
                </div>
              </div>
              <div className="relative w-full overflow-hidden lg:order-1 h-96 md:min-h-screen lg:h-auto lg:w-5/12">
                <div className="absolute inset-0">
                  <img className="object-cover w-full h-full" src="/home.png" alt="" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0">
                  <div className="p-4 sm:p-6 lg:p-8">
                    <p className="max-w-xs mt-1.5 text-xl text-white">Unlock your writing potential and improve your skills.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Home;
