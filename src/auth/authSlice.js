import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../features";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerApi(userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginApi(userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import api from "../features";

// const initialState = {
//   user: null,
// //   isLoggedIn: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isLoggedIn = true;
//     },
//     clearUser: (state) => {
//       state.user = null;
//       state.isLoggedIn = false;
//     },
//   },
// });

// export const { setUser, clearUser } = authSlice.actions;

// export const register = (username, email, password) => async (dispatch) => {
//   try {
//     const response = await api.register(username, email, password);

//     dispatch(setUser(response.data));
//     return Promise.resolve(response.data);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// export const login = (username, password) => async (dispatch) => {
//   try {
//     const response = await api.login(username, password);

//     dispatch(setUser(response));
//     return Promise.resolve(response);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// export const logout = () => async (dispatch) => {
//   api.logout();

//   dispatch(clearUser());
// };

// export default authSlice.reducer;
