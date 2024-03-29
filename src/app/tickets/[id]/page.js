"use client";

/* IMPORTS */

// React
import { useEffect, useState, useContext } from "react";
// Next.js
import { usePathname } from "next/navigation";
// External services
import { firebaseConfig, app } from "../../firebase/firebaseConfig";
import { getStorage } from "firebase/storage";
// Internal services
import { getTicketById } from "@/app/services/ticket.service";
import { addMessage } from "@/app/services/ticket.service";
// Components
import ProtectedRoute from "@/app/protectedRoutes/ProtectedRoute";
import TicketMessage from "../../components/TicketMessage";
import FileUpload from "../../components/FileUpload";
import TicketManagementBox from "@/app/components/TicketManagementBox";
// Internal functions
import getMetadataObject from "../../common/js/getMetadataObject";
import convertISOStringToLocalFormat from "@/app/common/js/convertISOStringToLocalFormat";
import getScreenSize from "@/app/common/rendering/getScreenSize";
import uploadFilesToCloud from "@/app/common/js/uploadFilesToCloud";
import getCurrentDateTimeISO from "@/app/common/js/getCurrentDateTimeISO";
// Contexts
import { AppContext } from "../../contexts/AppContext";
import { AuthContext } from "@/app/contexts/AuthContext";
// Material UI Components
import {
  Container,
  CssBaseline,
  Typography,
  Box,
  TextField,
  Button,
  Chip,
} from "@mui/material";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Single ticket page.

*/

const TicketPage = () => {
  const storage = getStorage(app);

  const [id, setId] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [priorityObj, setPriorityObj] = useState(null);
  const [statusObj, setStatusObj] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const pathname = usePathname();

  const [appState, appDispatch] = useContext(AppContext);
  const [authState] = useContext(AuthContext);

  const size = getScreenSize();

  useEffect(() => {
    const fetchId = async () => {
      const pathnameArr = await pathname.split("/");
      const extractedId = pathnameArr[2];
      setId(extractedId);
    };

    fetchId();
  }, [pathname]);

  useEffect(() => {
    if (id) {
      getTicketById(id)
        .then((response) => {
          setTicket(response.data);
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          appDispatch({
            type: "SET_MESSAGE",
            payload: message,
          });
        });
    }
  }, [id]);

  useEffect(() => {
    if (ticket) {
      const priority = getMetadataObject(
        "priorities",
        ticket.priorityId,
        appState.metadata
      );

      setPriorityObj(priority);
    }
    if (ticket) {
      const status = getMetadataObject(
        "statuses",
        ticket.statusId,
        appState.metadata
      );

      setStatusObj(status);
    }
  }, [ticket]);

  if (!id) {
    return <div>Loading...</div>;
  }

  if (!ticket) {
    return <div>Loading ticket data...</div>;
  }

  if (!priorityObj || !statusObj) {
    return <div>Loading ticket metadata...</div>;
  }

  function onNewMessageChangeHandler(event) {
    setMessageText(event.target.value);
  }

  function handleFileChange(files) {
    setUploadedFiles(files);
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      const fileLinks = await uploadFilesToCloud(uploadedFiles, storage);

      const currentDateTimeISO = getCurrentDateTimeISO();

      const ticketMessage = {
        ticketId: ticket.ticketId,
        senderId: authState.user.id,
        sender: authState.user.username,
        message: messageText,
        messageDate: currentDateTimeISO,
        uploadedFiles: fileLinks,
      };

      await addMessage(ticketMessage, ticket.ticketId);

      // Reload the page
      location.reload();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      appDispatch({
        type: "SET_MESSAGE",
        payload: message,
      });
    }
  }

  return (
    <ProtectedRoute>
      <div>
        <CssBaseline />
        <Container size="xl">
          <h1>
            #{id} - {ticket.ticketSubject}
          </h1>
          {/* Mostra i dettagli del ticket */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexFlow: size === "mobileSize" ? "column wrap" : "row wrap",
              gap: size === "mobileSize" ? "50px" : "0",
            }}
          >
            <Box>
              <Typography variant="body1" color="initial">
                <strong>Opened by:</strong> {ticket.openingUser}
              </Typography>
              <Typography variant="body1" color="initial">
                <strong>Priority:</strong>{" "}
                <Chip
                  style={
                    priorityObj
                      ? {
                          color: `#${priorityObj.textColorCode}`,
                          backgroundColor: `#${priorityObj.bgColorCode}`,
                          minWidth: "100px",
                          fontWeight: "bold",
                          marginTop: "3px",
                          marginBottom: "3px",
                        }
                      : {}
                  }
                  label={priorityObj.name}
                  size="small"
                />
              </Typography>
              <Typography variant="body1" color="initial">
                <strong>Status:</strong>{" "}
                <Chip
                  sx={
                    statusObj
                      ? {
                          color: `#${statusObj.textColorCode}`,
                          backgroundColor: `#${statusObj.bgColorCode}`,
                          minWidth: "100px",
                          fontWeight: "bold",
                          marginBottom: "3px",
                        }
                      : {}
                  }
                  label={statusObj.name}
                  size="small"
                />
              </Typography>
              <Typography variant="body1" color="initial">
                <strong>Assigned to:</strong> {ticket.assignedTo}
              </Typography>
              <Typography variant="body1" color="initial">
                <strong>Created:</strong>{" "}
                {convertISOStringToLocalFormat(ticket.creationDate)}
              </Typography>
              <Typography variant="body1" color="initial">
                <strong>Last updated:</strong>{" "}
                {convertISOStringToLocalFormat(ticket.lastUpdated)}
              </Typography>
            </Box>
            <TicketManagementBox
              user={authState.user}
              ticket={ticket}
              statuses={appState.metadata.statuses}
            />
          </Box>
          <Box sx={{ mt: "50px", border: "1px solid black" }}>
            {ticket.messages.map((message, key) => {
              return <TicketMessage messageData={message} key={key} />;
            })}
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              width: "100%",
              display: "flex",
              flexFlow: "column nowrap",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <TextField
              margin="normal"
              fullWidth
              multiline
              minRows={10}
              placeholder="Add a new message here"
              id="newmessage"
              name="newmessage"
              value={messageText}
              onChange={onNewMessageChangeHandler}
            />

            <FileUpload onFileChange={handleFileChange} />

            <Button
              type="submit"
              variant="contained"
              sx={{ mb: 2, width: "200px" }}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </div>
    </ProtectedRoute>
  );
};

export default TicketPage;
