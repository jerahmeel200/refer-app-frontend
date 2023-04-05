import axios from "axios";

// MUI THEME
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MUI_THEME from "@/styles/js/MUI_THEME";

// ROUTER PROGRESS BAR
import NextNProgress from "nextjs-progressbar";

// TOAST WRAPPER
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// REDUX STORE
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "@/reduxStore/store";

// Client-side cache, shared for the whole session of the user in the browser.
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/styles/js/createEmotionCache";

import config from "@/config";

// GLOBAL CSS
import "@/styles/css/globals.css";

const clientSideEmotionCache = createEmotionCache();

function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  //------------------------------------
  //Axios defauls
  //------------------------------------
  axios.defaults.baseURL = config.BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={wrapper}>
        <PersistGate
          persistor={wrapper.__persistor}
          // loading={<FullScreenLoader />}
        >
          <ThemeProvider theme={MUI_THEME}>
            <CssBaseline />
            <NextNProgress
              color="#1b3b6c"
              startPosition={0.3}
              stopDelayMs={200}
              height={4}
              showOnShallow={true}
            />
            <Component {...pageProps} />
          </ThemeProvider>
          <ToastContainer />
        </PersistGate>
      </Provider>
    </CacheProvider>
  );
}
export default App;
