import type { AppProps } from "next/app";
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from "react-hot-toast";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AnimatePresence mode="wait">
      <Toaster position="bottom-right" />
      <Component {...pageProps} />
    </AnimatePresence>
  )
};

export default App;
