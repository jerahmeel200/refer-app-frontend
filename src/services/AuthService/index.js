import axios from "axios";

class AuthService {
  login(requestBody) {
    return axios.post("/auth/login", requestBody);
  }

  register(requestBody) {
    return axios.post("/auth/register", requestBody);
  }

  getUser(requestBody) {
    return axios.get("/auth/user", requestBody);
  }
  update(requestBody) {
    return axios.put("/auth/updateuser", requestBody);
  }
}

export default new AuthService();
