import axios from "axios";

const API_URL = "http://localhost:8080/api/ticket/";

const createTicket = (ticket) => {
  console.log("ticket sent: ", ticket);
  return axios.post(API_URL + "post", ticket, {
    headers: { "Content-Type": "application/json" },
  });
};

export default createTicket;
