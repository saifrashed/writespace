import type { AppProps } from "next/app";
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from "react-hot-toast";
import useAuthentication from "@/lib/hooks/useAuthentication";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";
import "../styles/index.css";
import { useEffect } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Toaster position="bottom-right" />
      <Component {...pageProps} />
    </>
  )
};

export default App;
