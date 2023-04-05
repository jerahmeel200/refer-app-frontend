import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth";

// COMBINED REDUCERS
const reducers = {
  auth: authReducer,
};

export default combineReducers(reducers);
