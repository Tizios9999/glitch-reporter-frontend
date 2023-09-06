import axios from "axios";
import qs from "qs";
import authHeader from "./auth-header";

/**

Ticket related services.

*/

const API_URL = "http://localhost:8080/api/ticket/";

const createTicket = (ticket) => {
  console.log("ticket sent: ", ticket);
  const additionalHeaders = { "Content-Type": "application/json" };
  const combinedHeaders = { ...additionalHeaders, ...authHeader() };
  return axios
    .post(API_URL + "post", ticket, {
      headers: combinedHeaders,
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

// Old function, use getFilteredPage instead
const getPage = (page, pageSize) => {
  return axios.get(API_URL + "getpage", {
    params: { page: page, pageSize: pageSize },
    headers: authHeader(),
  });
};

const getFilteredPage = (page, pageSize, priorityIds, statusIds) => {
  const validPriorityIds = priorityIds.length > 0 ? priorityIds : [0];
  const validStatusIds = statusIds.length > 0 ? statusIds : [0];

  // custom serializeArray function
  function serializeArray(array) {
    let arrayString = "";
    array.forEach((element, index) => {
      if (index > 0) {
        arrayString = arrayString + ",";
      }
      arrayString = arrayString + `${element}`;
    });
    return `[${arrayString}]`;
  }

  return axios.get(API_URL + "getfilteredpage", {
    params: {
      page: page,
      pageSize: pageSize,
      priorityIds: serializeArray(validPriorityIds),
      statusIds: serializeArray(validStatusIds),
    },
    headers: authHeader(),
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "comma" });
    },
  });
};

const getTicketById = (id) => {
  console.log("request started");
  return axios.get(API_URL + id, {
    headers: authHeader(),
  });
};

const updateTicketStatus = (updateData, ticketId) => {
  return axios
    .put(API_URL + `${ticketId}/update-status`, updateData, {
      headers: authHeader(),
    })
    .then((response) => {
      console.log("Ticket updated: ", response.data);
    })
    .catch((error) => {
      console.error("Error during ticket update: ", error);
    });
};

const addMessage = (message, ticketId) => {
  return axios
    .post(API_URL + `${ticketId}/add-message`, message, {
      headers: authHeader(),
    })
    .then((response) => {
      console.log("Added message: ");
    })
    .catch((error) => {
      console.error("Error when sending message: ", error);
    });
};

export {
  createTicket,
  getPage,
  getFilteredPage,
  getTicketById,
  updateTicketStatus,
  addMessage,
};
