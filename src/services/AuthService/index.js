import axios from "axios";

class AuthService {
  login(requestBody) {
    return axios.post("/login", requestBody);
  }

  register(requestBody) {
    return axios.post("/register", requestBody);
  }

  getUser(requestBody) {
    return axios.get("/user", requestBody);
  }
}

export default new AuthService();
