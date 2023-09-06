import axios from "axios";

/**

Service that fetches ticket metadata from the backend.
(All the type of statuses, priorities etc)

*/

const API_URL = "http://localhost:8080/api/metadata/get";

const getMetadata = () => {
  return axios.get(API_URL);
};

export default getMetadata;
