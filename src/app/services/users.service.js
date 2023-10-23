import axios from "axios";
import authHeader from "./auth-header";

/**

User related services.

*/

const API_URL = "https://spring-glitchreporter.onrender.com/api/users/";

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
    .then(() => {})
    .catch((error) => {
      console.error("Error during user role update: ", error);
    });
};

const deleteUser = (id) => {
  return axios
    .delete(API_URL + `${id}`, { headers: authHeader() })
    .then((response) => {})
    .catch((error) => {
      console.error("Error while deleting user: ", error);
    });
};

export { getAll, changeRole, deleteUser };
