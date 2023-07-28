import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: "",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginUser: (state, action) => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
      state = {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };

      return state;
    },

    logoutUser: (state, action) => {
      state = {
        ...initialState,
      };

      return state;
    },
  },
});

const { actions, reducer } = authSlice;

export const { loginUser, logoutUser } = actions;
export default reducer;
