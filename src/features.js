import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; // replace with your API URL

export const registerApi = async (userData) => {
  const response = await axios.post(`${BASE_URL}/register`, userData);
  return response.data;
};

export const loginApi = async (userData) => {
  const response = await axios.post(`${BASE_URL}/login`, userData);
  return response.data;
};

// import axios from "axios";

// const API_URL = "http://localhost:8080/api/";

// const register = (username, email, password) => {
//   return axios.post(API_URL + "register", {
//     username,
//     email,
//     password,
//   });
// };

// const login = (username, password) => {
//   return axios
//     .post(API_URL + "login", {
//       username,
//       password,
//     })
//     .then((response) => {
//       if (response.data.accessToken) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }

//       return response.data;
//     });
// };

// const logout = () => {
//   localStorage.removeItem("user");
// };

// export default {
//   register,
//   login,
//   logout,
// };
