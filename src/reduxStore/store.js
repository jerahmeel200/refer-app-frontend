import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./slices";

const isDevMode = process.env.NODE_ENV === "development";
const allMiddlewares = [
  ...getDefaultMiddleware({ thunk: true, serializableCheck: false }),
];

// Redux Persist Config
const { persistStore, persistReducer } = require("redux-persist");
const storage = require("redux-persist/lib/storage").default;
const persistConfig = {
  key: "referallAppLocalStorage",
  blacklist: [""],
  whitelist: ["auth"], // only counter/slice will be persisted, add other reducers if needed
  storage, // if needed, use a safer storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: allMiddlewares,
  devTools: isDevMode, //only show dev tools if we are in development mode
});

store.__persistor = persistStore(store);

export const wrapper = store;
