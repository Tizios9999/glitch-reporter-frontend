import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/users/";

const getAll = () => {
  return axios.get(API_URL + "getall", {
    headers: authHeader(),
  });
};

const changeRole = (id, role) => {
  return axios
    .put(
      API_URL + `changerole/${id}`,
      { newRoleString: role },
      { headers: authHeader() }
    )
    .then((response) => {
      console.log("User role updated: ", response.data);
    })
    .catch((error) => {
      console.error("Error during user role update: ", error);
    });
};

export { getAll, changeRole };
