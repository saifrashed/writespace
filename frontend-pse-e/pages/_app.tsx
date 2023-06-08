import type { AppProps } from "next/app";
import { AnimatePresence } from 'framer-motion';
import { Toaster } from "react-hot-toast";
import { Provider } from '@/Context';
import useAuthentication from "@/lib/hooks/useAuthentication";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Toaster position="bottom-right" />
      <AnimatePresence>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </AnimatePresence>
    </>
  )
};

export default App;
