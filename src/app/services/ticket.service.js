import axios from "axios";

const API_URL = "http://localhost:8080/api/ticket/";

const createTicket = (ticket) => {
  console.log("ticket sent: ", ticket);
  return axios
    .post(API_URL + "post", ticket, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      console.log("Response from server: ", response.data);

      const ticketId = response.data.ticketId;

      return ticketId;
    })
    .catch((error) => {
      console.error("Error creating ticket: ", error);
      throw error;
    });
};

const getPage = (page, pageSize) => {
  return axios.get(API_URL + "getpage", {
    params: { page: page, pageSize: pageSize },
  });
};

export { createTicket, getPage };