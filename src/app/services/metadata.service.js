import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/metadata";

const getMetadata = () => {
  return axios.get(API_URL + "/get", { headers: authHeader() });
};

export default getMetadata;
