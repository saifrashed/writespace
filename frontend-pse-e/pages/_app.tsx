import type { AppProps } from "next/app";
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return <AnimatePresence mode="wait">
    <Component {...pageProps} key={router.route}/>
  </AnimatePresence>
};

export default App;
