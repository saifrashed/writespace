import type { AppProps } from "next/app";
import { AnimatePresence } from 'framer-motion';
import { Toaster } from "react-hot-toast";
import { Provider } from '@/Context';
import { Worker } from '@react-pdf-viewer/core';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";
import "../styles/index.css";
import { useEffect } from "react";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { refresh } = useAuthentication();

  useEffect(() => {
    async function refreshAsync() {
      await refresh()
    }
    refreshAsync()
  }, [router.pathname])

  return (
    <>
      <Toaster position="bottom-right" />
      <AnimatePresence>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js">
          <Provider>
            <Component {...pageProps} />
          </Provider>
        </Worker>
      </AnimatePresence>
    </>
  )
};

export default App;
