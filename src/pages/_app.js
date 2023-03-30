import "@/styles/globals.css";
// import store from "../store/index";
import authReducer from "../auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default App;
