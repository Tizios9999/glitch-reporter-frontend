import axios from "axios";

/**

Authentication services.

*/

const API_URL = "https://spring-glitchreporter.onrender.com/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const modifyPassword = (username, email, password) => {
  return axios.put(API_URL + "changepassword", {
    username,
    email,
    password,
  });
};

export default {
  register,
  login,
  logout,
  modifyPassword,
};
